package handlers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var clients = make(map[*websocket.Conn]uint)
var broadcast = make(chan models.Message)

func HandleMSGConnections(c *gin.Context) {
	var msg models.Message

	if err := c.ShouldBindJSON(&msg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error Binding": err.Error()})
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error building connection": err.Error()})
		return
	}
	defer conn.Close()

	senderID := msg.SenderID

	clients[conn] = senderID

	for {

		err := conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println(err)
			delete(clients, conn)
			break
		}

		msg.CreatedAt = time.Now()
		msg.SenderID = senderID
		connection.Db.Create(&msg)

		// Broadcast the message to the receiver (if available)
		if receiverConn, ok := getReceiverConnection(msg.ReceiverID); ok {
			receiverConn.WriteJSON(msg)
		}

		broadcast <- msg
	}
}

func getReceiverConnection(receiverID uint) (*websocket.Conn, bool) {
	for conn, userID := range clients {
		if userID == receiverID {
			return conn, true
		}
	}
	return nil, false
}
