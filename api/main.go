package main

import (
	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/routes"
	"github.com/gin-gonic/gin"
)

func init() {
	connection.Connect()
}

func main() {
	r := gin.Default()
	routes.UserAuthRoutes(r)
	r.Run("0.0.0.0:3000")

}
