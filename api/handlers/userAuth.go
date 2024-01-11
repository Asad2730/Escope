package handlers

import (
	"encoding/base64"

	"net/http"
	"os"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/facerecognition"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user models.User

	file, err := c.FormFile("face_id")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error binding": err.Error()})
		return
	}

	fileContent, err := os.ReadFile(file.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error reading file": err.Error()})
		return
	}

	user.FaceID = fileContent

	if err := connection.Db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, &user)
}

func LoginWithEmailPassword(c *gin.Context) {
	var user models.User
	email := c.PostForm("email")
	password := c.PostForm("password")

	if err := connection.Db.Where("email = ? AND password = ?", email, password).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, &user)
}

func LoginWithFaceID(c *gin.Context) {
	var loginRequest models.User
	if err := c.ShouldBind(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error binding": err.Error()})
		return
	}

	decodedFaceID, err := base64.StdEncoding.DecodeString(string(loginRequest.FaceID))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid base64-encoded FaceID"})
		return
	}

	var user models.User
	result := connection.Db.Where("email = ?", loginRequest.Email).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if !facerecognition.CompareFacialEncodings(decodedFaceID, user.FaceID, 0.5) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid FaceID"})
		return
	}

	c.JSON(http.StatusOK, &user)
}
