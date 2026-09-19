# Vector Image Search Engine

## 🚀 Project Overview

This is a full-stack web application built to search for visually similar images from a database. I built this project to learn and demonstrate my skills in **Angular** for the frontend, while connecting it to a Python backend.

## 💻 Tech Stack

- **Frontend:** Angular (Standalone Components, native fetch API, ChangeDetectorRef for seamless UI updates)
- **Backend:** Python, Flask
- **Search Engine:** CLIP Model (for vectorizing images) & FAISS (for fast similarity search)

## ⚙️ How It Works

1. The user selects an image via the Angular frontend.
2. The UI instantly displays a local preview.
3. The image is sent to the Flask backend, which converts it into a mathematical vector using the CLIP model.
4. FAISS scans the database to find the closest matching images.
5. The matching image URLs are sent back and rendered instantly on the Angular grid.

## 🛠️ How to Run This Project

### 1. Frontend Setup (Angular)

1. Open the terminal and go to the frontend folder.
2. Run `npm install` to download dependencies.
3. Run `ng serve` to start the Angular server on `localhost:4200`.

### 2. Backend Setup (Python)

1. Open a new terminal and go to the backend folder.
2. Install the required libraries: `pip install flask sentence-transformers faiss-cpu`
3. Run the server: `python app.py` (Runs on `localhost:5000`)
