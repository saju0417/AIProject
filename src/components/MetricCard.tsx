import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'emerald';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color 
}) => {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <p className="text-gray-600 text-sm">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;