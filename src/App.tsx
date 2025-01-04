import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import BrandLayout from './components/brand/BrandLayout';
import MainLayout from './components/MainLayout';

// Main Routes
import Home from './pages/Home';
import Shop from './pages/Shop';
import Discover from './pages/Discover';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import ProductDetails from './pages/ProductDetails';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

// Brand Routes
import BrandSignUp from './pages/brand/SignUp';
import BrandLogin from './pages/brand/auth/BrandLogin';
import BrandDashboard from './pages/brand/dashboard/BrandDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Brand Routes */}
          <Route path="/brand">
            <Route path="signup" element={<BrandSignUp />} />
            <Route path="login" element={<BrandLogin />} />
            <Route
              path="dashboard/*"
              element={
                <ProtectedRoute>
                  <BrandDashboard />
                </ProtectedRoute>
              }
            />
            <Route index element={<Navigate to="/brand/signup" replace />} />
          </Route>

          {/* Main Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}