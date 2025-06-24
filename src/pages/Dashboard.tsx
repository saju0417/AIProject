import React from 'react';
import MetricCard from '../components/MetricCard';
import SalesGraph from '../components/SalesGraph';
import RevenueChart from '../components/RevenueChart';
import OrdersTable from '../components/OrdersTable';
import LowStockTable from '../components/LowStockTable';
import ExpenseTable from '../components/ExpenseTable';
import { 
  Users, 
  ShoppingBag, 
  Baby,
  Shirt
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Mens',
      value: '500',
      icon: Users,
      color: 'emerald'
    },
    {
      title: 'Womens',
      value: '660',
      icon: ShoppingBag,
      color: 'emerald'
    },
    {
      title: 'Kids',
      value: '400',
      icon: Baby,
      color: 'emerald'
    },
    {
      title: 'Accessories',
      value: '250',
      icon: Shirt,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesGraph />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersTable />
        <LowStockTable />
      </div>

      <div className="w-full">
        <ExpenseTable />
      </div>
    </div>
  );
};

export default Dashboard;