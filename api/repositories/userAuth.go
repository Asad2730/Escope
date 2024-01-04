package repositories

import (
	"github.com/Asad2730/Escope/tree/main/api/connection"
	"github.com/Asad2730/Escope/tree/main/api/models"
)

func CreateUser(user models.User) (*models.User, error) {

	if err := connection.Db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func LoginWithEmailPassword(email string, password string) (*models.User, error) {
	var user models.User

	if err := connection.Db.Where("email = ? AND password = ?", email, password).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
