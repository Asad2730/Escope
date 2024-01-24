package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow connections from any origin

	},
}

var connectionMutex sync.Mutex
var clients = make(map[*websocket.Conn]bool)
var broadcastChannel = make(chan models.Message)

func init() {
	go handleBroadcast()
}

func HandleWebSocket(c *gin.Context) {
	fmt.Println("WebSocket connection from origin:", c.GetHeader("Origin"))
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println("WebSocket upgrade error:", err.Error())
		return
	}
	defer conn.Close()

	connectionMutex.Lock()
	clients[conn] = true
	connectionMutex.Unlock()

	go func() {
		for {
			messageType, p, err := conn.ReadMessage()
			if err != nil {
				connectionMutex.Lock()
				delete(clients, conn)
				connectionMutex.Unlock()
				break
			}
			handleMessage(messageType, p)
		}
	}()
}

func handleMessage(messageType int, payload []byte) {
	var messageObject models.Message
	err := json.Unmarshal(payload, &messageObject)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}

	fmt.Printf("Received message: %+v\n", messageObject)
	handleChatMessage(messageObject)
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
		for clientConn := range clients {
			err := clientConn.WriteJSON(message)
			if err != nil {
				fmt.Println("Error broadcasting message:", err)
			}
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
