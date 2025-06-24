import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  ShoppingCart, 
  Truck, 
  Package, 
  DollarSign,
  Star,
  Megaphone
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload-products', label: 'Upload Products', icon: Upload },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/delivery-tracking', label: 'Delivery Tracking', icon: Truck },
    { path: '/stocks', label: 'Stocks', icon: Package },
    { path: '/expense', label: 'Expense', icon: DollarSign },
    { path: '/reviews', label: 'Reviews & Ratings', icon: Star },
    { path: '/advertisement', label: 'Advertisement', icon: Megaphone },
  ];

  return (
    <div className="w-64 bg-white shadow-sm flex flex-col border-r border-gray-100">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-900">.cloths</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;