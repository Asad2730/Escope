package connection

import (
	"github.com/Asad2730/Escope/tree/main/api/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Connect() {

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "Place_postgres_url",
		PreferSimpleProtocol: true,
	}), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	Db.AutoMigrate(&models.User{})
	Db = db
}
