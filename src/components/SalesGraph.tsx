import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SalesGraph = () => {
  const [period, setPeriod] = useState('Week');

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sale's Graph</h3>
        <div className="relative">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points="20,180 60,120 100,140 140,100 180,120 220,80 260,100 300,60 340,80 380,70"
          />
          <circle cx="20" cy="180" r="3" fill="#10b981" />
          <circle cx="60" cy="120" r="3" fill="#10b981" />
          <circle cx="100" cy="140" r="3" fill="#10b981" />
          <circle cx="140" cy="100" r="3" fill="#10b981" />
          <circle cx="180" cy="120" r="3" fill="#10b981" />
          <circle cx="220" cy="80" r="3" fill="#10b981" />
          <circle cx="260" cy="100" r="3" fill="#10b981" />
          <circle cx="300" cy="60" r="3" fill="#10b981" />
          <circle cx="340" cy="80" r="3" fill="#10b981" />
          <circle cx="380" cy="70" r="3" fill="#10b981" />
        </svg>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thurs</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

export default SalesGraph;