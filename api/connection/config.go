package connection

import (
	"github.com/Asad2730/Escope/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Connect() {

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "Asad:123@tcp(127.0.0.1:3306)/escope?charset=utf8mb4&parseTime=True&loc=Local",
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}
	Db.AutoMigrate(&models.User{})
	Db = db
}
