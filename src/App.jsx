import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ModelViewer from "./components/ModelViewer";
import { AuthProvider, useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Navbar />

          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <div className="h-[800px]">
                      <ModelViewer />
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          <footer className="bg-white border-t">
            <div className="container mx-auto px-4 py-4">
              <p className="text-sm text-gray-600 text-center">
                3D CAD Viewer | Supported formats: .STL, .OBJ
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
