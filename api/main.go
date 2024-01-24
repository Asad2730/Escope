package main

import (
	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	connection.Connect()
}

func main() {
	ip := "192.168.10.13"
	r := gin.Default()

	r.Use(cors.Default())

	routes.UserAuthRoutes(r)
	routes.MessageRoute(r)

	// Use plain WebSocket for local development
	r.Run(ip + ":3000")
}
