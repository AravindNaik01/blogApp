import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/admin/edit-post/:slug" element={<ProtectedRoute><EditPost/></ProtectedRoute>} />
          <Route path="/category/:categoryName" element={<CategoryPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
