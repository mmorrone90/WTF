import React from 'react';
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import { AuthProvider } from './contexts/AuthContext';
    import { WishlistProvider } from './contexts/WishlistContext';

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
    import Products from './pages/brand/dashboard/Products';
    import Dashboard from './pages/brand/Dashboard';
    import ProtectedRoute from './components/auth/ProtectedRoute';
    import { useAuthContext } from './contexts/AuthContext';
    import Settings from './pages/brand/dashboard/Settings';
    import Invoices from './pages/brand/dashboard/Invoices';
    import Sales from './pages/brand/dashboard/Sales';
    import Feedback from './pages/brand/dashboard/Feedback';
    import Help from './pages/brand/dashboard/Help';

    function AppRoutes() {
      const { loading } = useAuthContext();

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon-yellow"></div>
          </div>
        );
      }

      return (
        <Routes>
          {/* Brand Routes */}
          <Route path="/brand">
            <Route path="signup" element={<BrandSignUp />} />
            <Route path="login" element={<BrandLogin />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <BrandDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="settings" element={<Settings />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="sales" element={<Sales />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="help" element={<Help />} />
            </Route>
            <Route index element={<Navigate to="/brand/signup" replace />} />
          </Route>

          {/* Main Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route path="shop">
              <Route index element={<Shop />} />
              <Route path="all-products" element={<Shop />} />
              <Route path="best-sellers" element={<Shop />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      );
    }

    export default function App() {
      return (
        <AuthProvider>
          <WishlistProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WishlistProvider>
        </AuthProvider>
      );
    }
