package services

import (
	"github.com/Asad2730/Escope/tree/main/api/models"
	"github.com/Asad2730/Escope/tree/main/api/repositories"
)

func CreateUser(user models.User) (*models.User, error) {

	res, err := repositories.CreateUser(user)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func LoginWithEmailPassword(email string, password string) (*models.User, error) {

	user, err := repositories.LoginWithEmailPassword(email, password)
	if err != nil {
		return nil, err
	}

	return user, nil
}
