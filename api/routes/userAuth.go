package routes

import (
	"github.com/Asad2730/Escope/handlers"
	"github.com/gin-gonic/gin"
)

func UserAuthRoutes(r *gin.Engine) {

	r.POST("/LoginWithEmailPassword", handlers.LoginWithEmailPassword)
	r.POST("/createUser", handlers.CreateUser)
	r.POST("/LoginWithFaceID", handlers.LoginWithFaceID)
	r.GET("/images/:filename", handlers.GetImage)
}
