import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import DeliveryTracking from './pages/DeliveryTracking';
import Stocks from './pages/Stocks';
import Expense from './pages/Expense';
import Reviews from './pages/Reviews';
import Advertisement from './pages/Advertisement';
import Login from './pages/Login';

interface User {
  email: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('user');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (storedUser && rememberMe === 'true') {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (credentials: { email: string; password: string; rememberMe: boolean }) => {
    // Simulate authentication
    const userData = {
      email: credentials.email,
      name: 'Joseph'
    };
    
    setUser(userData);
    
    if (credentials.rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('rememberMe', 'true');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-products" element={<ProductDetails />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/delivery-tracking" element={<DeliveryTracking />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;