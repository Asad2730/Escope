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

	r := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"*"}

	r.Use(cors.New(corsConfig))
	routes.UserAuthRoutes(r)
	routes.MessageRoute(r)
	r.Run("0.0.0.0:3000")
}
