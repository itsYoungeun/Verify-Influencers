import { useEffect, useState } from 'react';
import { Users, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from "framer-motion";

const LeaderboardPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [sortedInfluencers, setSortedInfluencers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSortedByTrust, setIsSortedByTrust] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/influencers');
        const data = await response.json();
        setInfluencers(data);
        setSortedInfluencers(data);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };

    fetchInfluencers();
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6 text-emerald-400" />, value: "1,234", label: "Active Influencers" },
    { icon: <CheckCircle className="w-6 h-6 text-emerald-400" />, value: "25,431", label: "Claims Verified" },
    { icon: <TrendingUp className="w-6 h-6 text-emerald-400" />, value: "85.7%", label: "Average Trust Score" },
  ];

  const categories = ["All", "Nutrition", "Fitness", "Medicine", "Mental Health"];

  const handleSortByTrust = () => {
    setIsSortedByTrust(!isSortedByTrust);
    const filteredInfluencers = selectedCategory === 'All'
      ? influencers
      : influencers.filter((influencer) => influencer.category === selectedCategory);

    const sortedData = [...filteredInfluencers].sort((a, b) => {
      return isSortedByTrust
        ? a.trustScore - b.trustScore
        : b.trustScore - a.trustScore;
    });

    setSortedInfluencers(sortedData);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSortedInfluencers(influencers);
    } else {
      setSortedInfluencers(influencers.filter((influencer) => influencer.category === category));
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Influencer Trust Leaderboard</h1>
        <p className="text-gray-400 mb-8">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 flex items-center space-x-4 pl-8">
              {stat.icon}
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full ${category === selectedCategory ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
          <button
            onClick={handleSortByTrust}
            className="ml-auto px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            {isSortedByTrust ? 'Lowest First' : 'Highest First'}
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="p-4">RANK</th>
                <th className="p-4">INFLUENCER</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">TRUST SCORE</th>
                <th className="p-4">TREND</th>
                <th className="p-4">FOLLOWERS</th>
                <th className="p-4">VERIFIED CLAIMS</th>
              </tr>
            </thead>
            <tbody>
              {sortedInfluencers.map((influencer) => (
                <tr key={influencer.rank} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="p-4 font-medium">#{influencer.rank}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={influencer.imageUrl}
                        alt={influencer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{influencer.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{influencer.category}</td>
                  <td className="p-4">
                    <span 
                      className={`
                        ${influencer.trustScore >= 90 ? 'text-emerald-400' : 
                          influencer.trustScore >= 80 ? 'text-yellow-400' :
                          influencer.trustScore >= 70 ? 'text-orange-400' : 'text-red-400'}
                    `}>
                      {influencer.trustScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    {influencer.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="p-4">{influencer.followers}</td>
                  <td className="p-4">{influencer.verifiedClaims}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderboardPage;