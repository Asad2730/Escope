package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
	"github.com/googollee/go-socket.io/engineio"
	"github.com/googollee/go-socket.io/engineio/transport"
	"github.com/googollee/go-socket.io/engineio/transport/polling"
	"github.com/googollee/go-socket.io/engineio/transport/websocket"
)

var server *socketio.Server
var connectionMutex sync.Mutex
var clients = make(map[socketio.Conn]bool)
var broadcastChannel = make(chan models.Message)

var allowOriginFunc = func(r *http.Request) bool {
	return true
}

func init() {

	//server := socketio.NewServer(nil)

	//configuring your Socket.IO server to use both polling and WebSocket transports with explicit options
	// for allowing any origin. This should help in resolving potential cross-origin issues.

	server := socketio.NewServer(&engineio.Options{
		Transports: []transport.Transport{
			&polling.Transport{
				CheckOrigin: allowOriginFunc,
			},
			&websocket.Transport{
				CheckOrigin: allowOriginFunc,
			},
		},
	})

	server.OnConnect("/", func(s socketio.Conn) error {
		fmt.Println("Connecting to Server")
		connectionMutex.Lock()
		clients[s] = true
		connectionMutex.Unlock()
		return nil
	})

	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
		var message models.Message
		if err := json.Unmarshal([]byte(msg), &message); err != nil {
			fmt.Println("Error decoding JSON:", err)
			return
		}

		fmt.Printf("Received message: %+v\n", message)
		handleChatMessage(message)
	})

	server.OnError("/", func(c socketio.Conn, err error) {
		fmt.Println("Server error:", err.Error())
	})
	go handleBroadcast()
}

func HandleWebSocket(c *gin.Context) {
	server.ServeHTTP(c.Writer, c.Request)
}

func handleMessage(messageType int, payload []byte) {

	var message models.Message
	err := json.Unmarshal(payload, &message)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	fmt.Printf("Received message: %+v\n", message)
	handleChatMessage(message)

}

func handleChatMessage(message models.Message) {
	connectionMutex.Lock()
	defer connectionMutex.Unlock()
	err := connection.Db.Create(&message).Error
	if err != nil {
		fmt.Println("Error saving message to the database:", err)
	}
	// Send the received message to the broadcast channel
	broadcastChannel <- message
}

func handleBroadcast() {

	for {
		message := <-broadcastChannel
		connectionMutex.Lock()
		for clientsConn := range clients {
			clientsConn.Emit("message", message)
		}
		connectionMutex.Unlock()
	}

}

func UserChatsForLoggedUser(c *gin.Context) {
	var users []models.User
	loggedUserEmail := c.Param("email")

	if err := connection.Db.Where("email != ?", loggedUserEmail).Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error building connection": err.Error()})
		return
	}
	c.JSON(http.StatusOK, &users)
}
