package facerecognition

import (
	"encoding/binary"
	"fmt"

	"math"
)

func CompareFacialEncodings(img1 []byte, img2 []byte, threshold float64) bool {
	encoding1, err1 := bytesToFloat64Slice(img1)
	encoding2, err2 := bytesToFloat64Slice(img2)

	if err1 != nil {
		fmt.Println("Error!:", err1)
	}
	if err2 != nil {
		fmt.Println("Error!:", err2)
	}
	// Ensure both encodings have the same length
	if len(encoding1) != len(encoding2) {
		return false
	}

	// Calculate Euclidean distance between the two encodings
	var distance float64
	for i := 0; i < len(encoding1); i++ {
		distance += math.Pow(encoding1[i]-encoding2[i], 2)
	}
	distance = math.Sqrt(distance)

	// Compare the distance with the threshold
	return distance <= threshold
}

func bytesToFloat64Slice(data []byte) ([]float64, error) {
	if len(data)%8 != 0 {
		return nil, fmt.Errorf("input length is not a multiple of 8")
	}

	result := make([]float64, len(data)/8)

	for i := 0; i < len(result); i++ {
		bits := binary.LittleEndian.Uint64(data[i*8 : (i+1)*8])
		result[i] = math.Float64frombits(bits)
	}

	return result, nil
}
