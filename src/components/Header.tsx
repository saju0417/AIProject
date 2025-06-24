import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search...."
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-80 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Joseph</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;