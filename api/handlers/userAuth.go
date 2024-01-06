package handlers

import (
	"net/http"

	"github.com/Asad2730/Escope/tree/main/api/connection"
	"github.com/Asad2730/Escope/tree/main/api/facerecognition"
	"github.com/Asad2730/Escope/tree/main/api/models"
	"github.com/gin-gonic/gin"
	"gocv.io/x/gocv"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Load the image from user.FaceID (assuming it's a file path, adjust as needed)

	img, err := gocv.IMDecode(user.FaceID, gocv.IMReadColor)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to decode the image"})
		return
	}
	defer img.Close()

	facialEncoding := facerecognition.PerformFacialRecognition(img)
	user.FaceID = facialEncoding

	if err := connection.Db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
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

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	var storedUser models.User
	if err := connection.Db.Where("email = ?", user.Email).First(&storedUser).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	img, err := gocv.IMDecode(user.FaceID, gocv.IMReadColor)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to decode the image"})
		return
	}
	defer img.Close()

	providedFacialEncoding := facerecognition.PerformFacialRecognition(img)
	threshold := 0.5
	if !facerecognition.CompareFacialEncodings(storedUser.FaceID, providedFacialEncoding, threshold) {
		c.JSON(http.StatusUnauthorized, "Facial recognition failed")
		return
	}

	c.JSON(http.StatusOK, &storedUser)
}
