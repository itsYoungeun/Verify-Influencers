import { motion } from 'framer-motion';
import { 
  Brain, 
  Moon, 
  Zap, 
  Dumbbell, 
  HeartPulse, 
  Sun, 
  Clock,
  Search,
  Calendar,
  ArrowUpRight,
  Filter
} from 'lucide-react';

const InfluencerDetailPage = () => {
  const categories = [
    'All Categories', 'Sleep', 'Performance', 'Hormones', 'Nutrition',
    'Exercise', 'Stress', 'Cognition', 'Motivation', 'Recovery', 'Mental Health'
  ];

  const stats = [
    { label: 'Trust Score', value: '89%', subtext: 'Based on 127 verified claims', icon: <ArrowUpRight className="w-4 h-4 text-emerald-500" /> },
    { label: 'Yearly Revenue', value: '$5.0M', subtext: 'Estimated earnings', icon: <ArrowUpRight className="w-4 h-4 text-emerald-500" /> },
    { label: 'Products', value: '1', subtext: 'Recommended products', icon: <ArrowUpRight className="w-4 h-4 text-emerald-500" /> },
    { label: 'Followers', value: '4.2M+', subtext: 'Total following', icon: <ArrowUpRight className="w-4 h-4 text-emerald-500" /> },
  ];

  const expertise = [
    { icon: <Brain className="w-5 h-5" />, label: 'Neuroscience' },
    { icon: <Moon className="w-5 h-5" />, label: 'Sleep' },
    { icon: <Zap className="w-5 h-5" />, label: 'Performance' },
    { icon: <HeartPulse className="w-5 h-5" />, label: 'Hormones' },
    { icon: <Dumbbell className="w-5 h-5" />, label: 'Exercise Science' },
    { icon: <Sun className="w-5 h-5" />, label: 'Light Exposure' },
    { icon: <Clock className="w-5 h-5" />, label: 'Circadian Biology' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-gray-100 p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-6 mb-12">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Andrew Huberman</h1>
            <div className="flex flex-wrap gap-3 mb-4">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-1">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 leading-relaxed">
              Stanford Professor of Neurobiology and Ophthalmology, focusing on neural development,
              brain plasticity, and neural regeneration. Host of the Huberman Lab Podcast, translating
              neuroscience into practical tools for everyday life. Known for evidence-based approaches to
              performance, sleep, stress management, and brain optimization.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400">{stat.label}</h3>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-emerald-500 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Claims Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex gap-4 mb-6">
            <button className="bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium">Claims Analysis</button>
            <button className="text-gray-400 px-4 py-2 rounded-lg text-sm font-medium">Recommended Products</button>
            <button className="text-gray-400 px-4 py-2 rounded-lg text-sm font-medium">Monetization</button>
          </div>

          {/* Search and Filters */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search claims..."
              className="w-full bg-gray-900 rounded-lg pl-12 pr-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm ${
                    index === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-medium">All Statuses</button>
              <button className="text-gray-400 px-4 py-2 rounded-lg text-sm font-medium">Verified</button>
              <button className="text-gray-400 px-4 py-2 rounded-lg text-sm font-medium">Questionable</button>
              <button className="text-gray-400 px-4 py-2 rounded-lg text-sm font-medium">Debunked</button>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-gray-900 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Date</option>
              </select>
              <button className="p-2 rounded-lg bg-gray-900">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Claims List */}
          <div className="space-y-4">
            <div className="border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs">verified</span>
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">14/01/2024</span>
                <span className="ml-auto text-emerald-500 font-bold">92%</span>
              </div>
              <h3 className="text-lg font-medium mb-2">
                Viewing sunlight within 30-60 minutes of waking enhances cortisol release
              </h3>
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <a href="#" className="hover:underline">View Source</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerDetailPage;