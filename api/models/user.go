package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `json:"email" gorm:"primaryKey;unique"`
	Password string `json:"password"`
	FaceID   []byte `json:"face_id"`
	UserID   uint   `json:"user_id" gorm:"autoIncrement"`
}
