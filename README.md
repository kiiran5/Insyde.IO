# INSYDE - Web-Based CAD Viewer

INSYDE is a web-based CAD viewer that allows users to upload, view, and manipulate 3D models (STL/OBJ). The project includes authentication features (login/register), file uploads, and a history preview for user interactions. The frontend is built with React and Three.js, while the backend is developed using Express.js and MongoDB.

## Features
- **User Authentication** (Register/Login)
- **Upload 3D Models** (STL/OBJ format)
- **View & Manipulate Models** (Rotate, Zoom, Reset, Download, Grid, Pan using Three.js)
- **Secure API** (Built with Express.js, MongoDB, and JWT authentication)

## Tech Stack

### Frontend
- React.js
- Three.js
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT for Authentication
- Multer for File Uploads
- Dotenv for Configuration

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (Local or Cloud - MongoDB Atlas)
- **MongoDB Compass** (For local database management)

### Clone the Repository
```sh
git clone https://github.com/kiiran5/Insyde.IO.git
cd insyde
```

### Backend Setup
Navigate to the backend folder:
```sh
cd backend
```
Install dependencies:
```sh
npm install
```

Install and configure MongoDB Compass:
1. Download and install **MongoDB Compass**
2. Open **MongoDB Compass** and connect to the local database using:
   ```sh
   mongodb://localhost:27017/insyde
   ```
3. Create a new database named **insyde**

Create a `.env` file and add the following variables:
```sh
PORT=5000
MONGODB_URI=mongodb://localhost:27017/3d-viewer
JWT_SECRET=mysecretkey
```

Start the backend server:
```sh
npm start
```
The backend will run on `http://localhost:5000`

### Frontend Setup
Navigate to the frontend folder:
```sh
cd frontend
```
Install dependencies:
```sh
npm install
```
Start the frontend server:
```sh
npm start
```
The frontend will run on `http://localhost:3000`

## Usage
1. Register/Login to the platform.
2. Upload a 3D model file (STL/OBJ).
3. View and interact with the 3D model using the UI controls.
4. Check history to view previously uploaded models.

## License
This project is open-source and available under the [MIT License](LICENSE).

