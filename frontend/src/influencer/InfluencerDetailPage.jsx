import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Calendar, 
  Filter, ExternalLink,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users
} from 'lucide-react';

const InfluencerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Claims Analysis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Date');

  const categories = [
    'All Categories', 'Sleep', 'Performance', 'Hormones', 'Nutrition',
    'Exercise', 'Stress', 'Cognition', 'Motivation', 'Recovery', 'Mental Health'
  ];

  const verificationStatuses = ['All Statuses', 'Verified', 'Questionable', 'Debunked'];

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/influencers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch influencer details');
        const data = await response.json();
        setInfluencer(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchInfluencer();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-gray-900 p-8">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 p-8">Error: {error}</div>;

  const handleGoBack = () => navigate(-1);

  const parseFollowers = (followers) => {
    if (typeof followers === "string") {
      if (followers.includes("M")) return parseFloat(followers) * 1_000_000;
      if (followers.includes("K")) return parseFloat(followers) * 1_000;
    }
    return Number(followers) || 0; // Fallback to 0 if invalid
  };

  // Calculate earnings based on trust score and followers
  const calculateEarnings = (trustScore, followers) => {
    const parsedFollowers = parseFollowers(followers);
    const earnings = 1.5 * (trustScore / 100) * parsedFollowers;
    return formatEarnings(earnings);
  };

  const formatEarnings = (earnings) => {
    if (earnings >= 1000000) {
      return (earnings / 1000000).toFixed(1) + 'M';
    } else if (earnings >= 1000) {
      return (earnings / 1000).toFixed(1) + 'K';
    }
    return earnings.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="p-8">
        <div className="flex items-start gap-6 mb-12">
          <button onClick={handleGoBack} className="text-emerald-400 hover:text-emerald-500">
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-start gap-6 mb-12">
          <img
            src={influencer.imageUrl || '/default-avatar.png'}
            alt={influencer.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{influencer.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((item, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-gray-400">{influencer.bio}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-gray-400">Trust Score</h2>
              {influencer.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
            </div>
            <p className="text-3xl font-bold text-emerald-500">{influencer.trustScore}%</p>
            <p className="text-sm text-gray-500">Based on {influencer.verifiedClaims} verified claims</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-gray-400">Yearly Revenue</h2>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">
              ${calculateEarnings(influencer.trustScore, influencer.followers)}
            </p>
            <p className="text-sm text-gray-500">Estimated earnings</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-gray-400">Products</h2>
              <Package className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">
              {parseFollowers(influencer.followers) >= 4_000_000
                    ? 3
                    : parseFollowers(influencer.followers) >= 1_000_000
                    ? 2
                    : parseFollowers(influencer.followers) >= 100_000
                    ? 1
                    : 0}
            </p>
            <p className="text-sm text-gray-500">Recommended products</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-gray-400">Followers</h2>
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">{influencer.followers}</p>
            <p className="text-sm text-gray-500">Total following</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <nav className="flex gap-6">
            {['Claims Analysis', 'Recommended Products', 'Monetization'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 ${
                  activeTab === tab
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Claims Section */}
        {activeTab === 'Claims Analysis' && (
          <div className="mt-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search claims..."
                className="w-full bg-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {verificationStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedStatus === status
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Date</option>
                    <option>Trust Score</option>
                    <option>Popularity</option>
                  </select>
                  <button className="p-2 bg-gray-800 rounded-lg">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Claims List */}
            <div className="space-y-4">
              {influencer.claims?.map((claim, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs">
                      verified
                    </span>
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{claim.date}</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{claim.title}</h3>
                  <p className="text-gray-400 mb-4">{claim.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <ExternalLink className="h-4 w-4" />
                      <a href={claim.source} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        View Source
                      </a>
                    </div>
                    <span className="text-emerald-500 font-medium">{claim.trustScore}% Trust Score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDetailPage;