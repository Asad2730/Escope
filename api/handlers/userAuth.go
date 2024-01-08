package handlers

import (
	"encoding/base64"
	"net/http"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/facerecognition"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Ensure that the FaceID field is populated with raw binary image data
	if len(user.FaceID) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FaceID cannot be empty"})
		return
	}

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
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Convert the base64-encoded FaceID string to a byte slice
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

	// Compare the decodedFaceID with the stored FaceID using facial recognition logic
	if !facerecognition.CompareFacialEncodings(decodedFaceID, user.FaceID, 0.5) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid FaceID"})
		return
	}

	c.JSON(http.StatusOK, &user)
}
