package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `form:"email" gorm:"primaryKey;unique" binding:"required"`
	Password string `form:"password" binding:"required"`
	FaceID   []byte `form:"face_id" binding:"required"`
	UserID   uint   `form:"user_id" gorm:"autoIncrement" binding:"required"`
}
