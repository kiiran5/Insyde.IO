# INSYDE - Web-Based CAD Viewer

INSYDE is an interactive web application designed for viewing and manipulating 3D models in STL and OBJ formats. The platform allows users to authenticate, upload, and interact with 3D files efficiently. The frontend is developed using React.js and Three.js, while the backend is powered by Express.js and MongoDB for secure data handling.

## Features
- **User Authentication** (Sign up & Login)
- **Upload 3D Models** (STL/OBJ format)
- **nteractive 3D Viewer** (Rotate, Zoom, Reset, Pan, Grid View)
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
cd Insyde.IO
```

### Backend Setup
Install dependencies:
```sh
npm install
```

Install and configure MongoDB Compass:
1. Download and install **MongoDB Compass**
2. Open **MongoDB Compass** and connect to the local database using:
   ```sh
   mongodb://localhost:27017/3d-viewer
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
```
npm install
```
Start the frontend server:
```
npm run dev
```
The frontend will run on `http://localhost:5173`

## Usage
1. Register/Login to the platform.
2. Upload a 3D model file (STL/OBJ).
3. View and interact with the 3D model using the UI controls.

## License
This project is open-source and available under the [MIT License](LICENSE).

