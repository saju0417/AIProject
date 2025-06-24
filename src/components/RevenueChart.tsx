import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const RevenueChart = () => {
  const [period, setPeriod] = useState('Today');

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
        <div className="relative">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>Today</option>
            <option>Week</option>
            <option>Month</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray="150 100"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="#059669"
              strokeWidth="6"
              strokeDasharray="120 80"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-500">Dress</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Mens</span>
          </div>
          <span className="text-sm font-medium">Rs.30,000</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Womens</span>
          </div>
          <span className="text-sm font-medium">Rs.20,000</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Kids</span>
          </div>
          <span className="text-sm font-medium">Rs.10,000</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-200 rounded-full"></div>
            <span className="text-sm text-gray-600">Accessories</span>
          </div>
          <span className="text-sm font-medium">Rs.10,000</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;