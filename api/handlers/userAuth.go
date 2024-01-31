package handlers

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"

	"net/http"
	"os"

	"github.com/Asad2730/Escope/connection"
	"github.com/Asad2730/Escope/models"
	"github.com/gin-gonic/gin"
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

		path1, err := filepath.Abs(filepath.Join("uploads", user.FaceID))
		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		path2, err := filepath.Abs(filepath.Join("tempUploads", imageFile.Filename))
		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		pythonScript := "FaceAlgo/face.py"

		cmd := exec.Command("python", pythonScript, path1, path2)

		output, err := cmd.CombinedOutput()

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"Error executing Python script": err})
			return
		}

		isSame, err := strconv.ParseBool(strings.TrimSpace(string(output)))

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"Error parsing Python script output": err.Error()})
			return
		}

		if bool(isSame) {
			c.JSON(http.StatusOK, &user)
		} else {
			c.JSON(http.StatusNotFound, "images did not match")
		}

		deleteImage(path2)

	}

}

func GetImage(c *gin.Context) {
	filename := c.Param("filename")
	c.File("uploads/" + filename)

}

func deleteImage(path string) {
	defer func() {
		if err := os.Remove(path); err != nil {
			fmt.Println("Error removing temporary file:", err)
		}
	}()
}
