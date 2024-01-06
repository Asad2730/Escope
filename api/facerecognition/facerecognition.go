package facerecognition

import (
	"encoding/binary"
	"image"
	"math"

	"gocv.io/x/gocv"
)

// PerformFacialRecognition performs facial recognition and returns the facial encoding.
func PerformFacialRecognition(img gocv.Mat) []byte {
	// Load the pre-trained face detection model
	net := gocv.ReadNet("deploy.prototxt", "res10_300x300_ssd_iter_140000_fp16.caffemodel")
	if net.Empty() {
		return []byte{} // Unable to load the model
	}
	defer net.Close()

	// Convert the image to a blob
	blob := gocv.BlobFromImage(img, 1.0, image.Pt(300, 300), gocv.NewScalar(104, 177, 123, 0), false, false)
	defer blob.Close()

	// Set the input blob for the model
	net.SetInput(blob, "data")

	// Forward pass to perform face detection
	detection := net.Forward("detection_out")
	defer detection.Close()

	// Process the detection results
	for i := 0; i < detection.Total(); i += 7 {
		confidence := detection.GetFloatAt(0, i+2)
		if confidence > 0.5 { // Confidence threshold for face detection
			// Extract the face region
			left := int(detection.GetFloatAt(0, i+3) * float32(img.Cols()))
			top := int(detection.GetFloatAt(0, i+4) * float32(img.Rows()))
			right := int(detection.GetFloatAt(0, i+5) * float32(img.Cols()))
			bottom := int(detection.GetFloatAt(0, i+6) * float32(img.Rows()))

			// Crop the face region
			face := img.Region(image.Rect(left, top, right, bottom))
			defer face.Close()

			// You can now perform facial recognition on the 'face' image
			// Implement your facial recognition logic here
		}
	}

	return []byte{} // Placeholder facial encoding
}

func CompareFacialEncodings(img1 []byte, img2 []byte, threshold float64) bool {

	encoding1 := bytesToFloat64Slice(img1)
	encoding2 := bytesToFloat64Slice(img2)
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

func bytesToFloat64Slice(data []byte) []float64 {
	result := make([]float64, len(data)/8) // Assuming each float64 takes 8 bytes

	for i := 0; i < len(result); i++ {
		bits := binary.LittleEndian.Uint64(data[i*8 : (i+1)*8])
		result[i] = math.Float64frombits(bits)
	}

	return result
}
