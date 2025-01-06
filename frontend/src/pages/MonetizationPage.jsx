import { useEffect, useState } from 'react';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer } from 'recharts';
import { DollarSign, Package, ShoppingBag, Users, ArrowUpRight, Filter } from 'lucide-react';
import { motion } from "framer-motion";

const MonetizationPage = () => {
  const [dateRange, setDateRange] = useState('last-month');
  
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4200000, products: 12 },
    { month: 'Feb', revenue: 5000000, products: 15 },
    { month: 'Mar', revenue: 4800000, products: 14 },
    { month: 'Apr', revenue: 5200000, products: 16 },
    { month: 'May', revenue: 5500000, products: 18 },
    { month: 'Jun', revenue: 5100000, products: 17 }
  ];

  const categoryData = [
    { category: 'Supplements', revenue: 2500000 },
    { category: 'Digital Products', revenue: 1800000 },
    { category: 'Coaching', revenue: 1200000 },
    { category: 'Merchandise', revenue: 800000 },
    { category: 'Sponsorships', revenue: 500000 }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-slate-900 text-gray-100 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Monetization Analysis</h1>
          <p className="text-gray-400">Track and analyze influencer revenue streams and product performance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <DollarSign className="text-emerald-500" />, label: 'Total Revenue', value: '$5.0M', change: '+12%' },
            { icon: <Package className="text-emerald-500" />, label: 'Active Products', value: '18', change: '+3' },
            { icon: <ShoppingBag className="text-emerald-500" />, label: 'Avg. Order Value', value: '$85', change: '+5%' },
            { icon: <Users className="text-emerald-500" />, label: 'Customer Base', value: '58.2K', change: '+8%' }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-700 rounded-lg">
                  {stat.icon}
                </div>
                <span className="text-emerald-500 flex items-center text-sm">
                  {stat.change}
                  <ArrowUpRight size={16} className="ml-1" />
                </span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-gray-400 outline-none"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-year">Last Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Revenue by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981" 
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Revenue Breakdown</h2>
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-400">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">${(item.revenue / 1000000).toFixed(1)}M</span>
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(item.revenue / categoryData[0].revenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MonetizationPage;