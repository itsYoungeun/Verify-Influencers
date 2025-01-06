import { useState } from 'react';
import { Check, AlertTriangle, ExternalLink, ShoppingBag, DollarSign, Activity, Star, Filter, ArrowUpRight } from 'lucide-react';

const ProductPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  
  const productStats = [
    { icon: <ShoppingBag />, label: 'Total Products', value: '127', change: '+12' },
    { icon: <DollarSign />, label: 'Revenue Generated', value: '$5.0M', change: '+15%' },
    { icon: <Activity />, label: 'Conversion Rate', value: '4.2%', change: '+0.5%' },
    { icon: <Star />, label: 'Avg Rating', value: '4.8', change: '+0.2' }
  ];

  const products = [
    {
      id: 1,
      name: 'Sleep Optimization Guide',
      category: 'Digital Product',
      status: 'verified',
      price: '$47',
      sales: '12.4K',
      revenue: '$582,800',
      rating: 4.8,
      verificationScore: 92,
      claims: [
        { text: 'Based on peer-reviewed sleep research', verified: true },
        { text: 'Improves sleep quality in 2 weeks', verified: true },
        { text: 'Backed by clinical studies', verified: false }
      ]
    },
    {
      id: 2,
      name: 'Morning Ritual Supplement',
      category: 'Supplement',
      status: 'pending',
      price: '$39',
      sales: '8.2K',
      revenue: '$319,800',
      rating: 4.6,
      verificationScore: 85,
      claims: [
        { text: 'Natural ingredients only', verified: true },
        { text: 'Boosts morning energy', verified: false },
        { text: 'Third-party tested', verified: true }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-emerald-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Analysis</h1>
          <p className="text-gray-400">Verify and track influencer product claims and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {productStats.map((stat, index) => (
            <div key={index} className="bg-slate-800 border-slate-700 rounded-lg shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-slate-700 rounded-lg text-emerald-500">
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
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-gray-400 outline-none"
            >
              <option value="all">All Products</option>
              <option value="verified">Verified Only</option>
              <option value="pending">Pending Review</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <span className={`text-sm ${getStatusColor(product.status)} capitalize`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-gray-400">{product.category}</p>
                </div>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="font-semibold">{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Sales</p>
                    <p className="font-semibold">{product.sales}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Revenue</p>
                    <p className="font-semibold">{product.revenue}</p>
                  </div>
                </div>
              </div>

              {/* Verification Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Verification Score</p>
                  <p className="font-semibold">{product.verificationScore}%</p>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${product.verificationScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Claims Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Claims Analysis</h3>
                <div className="space-y-3">
                  {product.claims.map((claim, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      {claim.verified ? (
                        <Check className="text-emerald-500 mt-1" size={16} />
                      ) : (
                        <AlertTriangle className="text-yellow-500 mt-1" size={16} />
                      )}
                      <span className="text-gray-400">{claim.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Link */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <a href="#" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 text-sm">
                  View Full Analysis
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;