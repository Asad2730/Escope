package routes

import (
	"github.com/Asad2730/Escope/handlers"
	"github.com/gin-gonic/gin"
)

func MessageRoute(r *gin.Engine) {
	r.GET("/MessageConnection", handlers.HandleMSGConnections)
}
