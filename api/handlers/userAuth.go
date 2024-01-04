package handlers

import (
	"github.com/Asad2730/Escope/tree/main/api/models"
	"github.com/Asad2730/Escope/tree/main/api/services"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user).Error; err != nil {
		c.JSON(402, err)
	}

	res, err := services.CreateUser(user)
	if err != nil {
		c.JSON(502, err.Error())
	}
	c.JSON(201, res)
}

func LoginWithEmailPassword(c *gin.Context) {

	email := c.PostForm("email")
	password := c.PostForm("password")

	user, err := services.LoginWithEmailPassword(email, password)
	if err != nil {
		c.JSON(502, err.Error())
	}

	c.JSON(200, user)
}
