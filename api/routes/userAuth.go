package routes

import (
	"github.com/Asad2730/Escope/tree/main/api/handlers"
	"github.com/gin-gonic/gin"
)

func UserAuthRoutes(r *gin.Engine) {

	r.POST("/login", handlers.LoginWithEmailPassword)
	r.POST("/createUser", handlers.CreateUser)
}
