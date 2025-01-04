import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, ArrowUpRight, Zap,
} from 'lucide-react';

const InfluencerDetailPage = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if influencerId is valid
    if (!id) {
      setError('Influencer ID is missing or invalid.');
      setLoading(false);
      return;
    }

    const fetchInfluencer = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/influencers/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch influencer details');
        }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            src={influencer.imageUrl || 'default-profile-image-url'}
            alt={influencer.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{influencer.name}</h1>
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Expertise: Replace with dynamic data if available */}
              {influencer.expertise?.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-1">
                  {item.icon || <Zap className="w-5 h-5" />}
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 leading-relaxed">
              {influencer.bio || 'This influencer does not have a bio yet.'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">Trust Score</h3>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500 mb-1">{influencer.trustScore}%</p>
            <p className="text-sm text-gray-400">Based on {influencer.verifiedClaims} verified claims</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400">Followers</h3>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500 mb-1">{influencer.followers}</p>
            <p className="text-sm text-gray-400">Total following</p>
          </div>
        </div>

        {/* Claims Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Verified Claims</h2>
          {influencer.claims?.map((claim, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs">verified</span>
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{claim.date}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{claim.title}</h3>
              <div className="flex items-center gap-2 text-emerald-500 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <a href={claim.source} target="_blank" rel="noopener noreferrer" className="hover:underline">View Source</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InfluencerDetailPage;