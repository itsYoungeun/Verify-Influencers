import { Users, CheckCircle, TrendingUp } from 'lucide-react';

const LeaderboardPage = () => {
  const stats = [
    { icon: <Users className="w-6 h-6 text-emerald-400" />, value: "1,234", label: "Active Influencers" },
    { icon: <CheckCircle className="w-6 h-6 text-emerald-400" />, value: "25,431", label: "Claims Verified" },
    { icon: <TrendingUp className="w-6 h-6 text-emerald-400" />, value: "85.7%", label: "Average Trust Score" },
  ];

  const categories = ["All", "Nutrition", "Fitness", "Medicine", "Mental Health"];

  const influencers = [
    {
      rank: 1,
      name: "Dr. Peter Attia",
      category: "Medicine",
      trustScore: 94,
      trend: "up",
      followers: "1.2M+",
      verifiedClaims: 203,
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop"
    },
    {
      rank: 2,
      name: "Dr. Rhonda Patrick",
      category: "Nutrition",
      trustScore: 91,
      trend: "up",
      followers: "980K+",
      verifiedClaims: 156,
      imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop"
    },
    // Add more influencers as needed
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Influencer Trust Leaderboard</h1>
        <p className="text-gray-400 mb-8">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
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
              className={`px-4 py-2 rounded-full ${
                index === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="ml-auto px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Highest First
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
              {influencers.map((influencer) => (
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
                    <span className="text-emerald-400">{influencer.trustScore}%</span>
                  </td>
                  <td className="p-4">
                    <TrendingUp className={`w-5 h-5 ${
                      influencer.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`} />
                  </td>
                  <td className="p-4">{influencer.followers}</td>
                  <td className="p-4">{influencer.verifiedClaims}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;