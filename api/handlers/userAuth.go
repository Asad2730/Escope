package handlers

import (
	"path/filepath"

	"net/http"
	"os"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
	"github.com/vitali-fedulov/images4"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBind(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error Binding": err.Error()})
		return
	}

	imageFile, err := c.FormFile("face_id")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error uploading image": err.Error()})
		return
	}

	if imageFile != nil {

		// Get the current working directory
		currentDir, err := os.Getwd()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Construct the absolute path for the uploads folder
		uploadsDir := filepath.Join(currentDir, "uploads")
		imagePath := filepath.Join(uploadsDir, imageFile.Filename)

		if err := c.SaveUploadedFile(imageFile, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error saving file": err.Error()})
			return
		}
		user.FaceID = imageFile.Filename
		if err := connection.Db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, &user)
	}
}

func LoginWithEmailPassword(c *gin.Context) {

	var credentials map[string]string
	if err := c.BindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Invalid JSON format": err.Error()})
		return
	}

	var user models.User
	email := credentials["email"]
	password := credentials["password"]

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

	var user models.User
	result := connection.Db.Where("email = ?", loginRequest.Email).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	imageFile, err := c.FormFile("face_id")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error uploading image": err.Error()})
		return
	}

	if imageFile != nil {

		currentDir, err := os.Getwd()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		uploadsDir := filepath.Join(currentDir, "tempUploads")
		imagePath := filepath.Join(uploadsDir, imageFile.Filename)

		if err := c.SaveUploadedFile(imageFile, imagePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error saving file": err.Error()})
			return
		}

		path1 := filepath.Join("uploads", user.FaceID)
		path2 := filepath.Join("tempUploads", imageFile.Filename)

		img1, err := images4.Open(path1)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error opening image file"})
			return
		}

		img2, err := images4.Open(path2)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error opening uploaded image file"})
			return
		}

		icon1 := images4.Icon(img1)
		icon2 := images4.Icon(img2)

		if err := os.Remove(path2); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"Error removing temporary file": err.Error()})
			return
		}

		// Comparison. Images are not used directly. Icons are used instead, because they have tiny memory footprint and fast to compare. If you need to include images rotated right and left use func Similar90270.
		if images4.Similar90270(icon1, icon2) {
			c.JSON(http.StatusOK, &user)
		} else {
			c.JSON(http.StatusUnauthorized, "Images are disticnt")
		}
	}

}
