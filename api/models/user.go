package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `form:"email" gorm:"primaryKey;unique;index" binding:"required"`
	Password string `form:"password" binding:"required"`
	FaceID   string
	UserID   uint `form:"user_id" gorm:"autoIncrement"`
}
