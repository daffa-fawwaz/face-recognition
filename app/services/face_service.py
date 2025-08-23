# app/services/face_service.py
import face_recognition
import numpy as np

def get_face_encoding(image):
    encodings = face_recognition.face_encodings(image)
    if len(encodings) > 0:
        return encodings[0].tolist()
    return None

def compare_faces(known_encodings, face_encoding, tolerance=0.45):
    results = face_recognition.compare_faces(known_encodings, face_encoding, tolerance)
    distances = face_recognition.face_distance(known_encodings, face_encoding)
    return results, distances
