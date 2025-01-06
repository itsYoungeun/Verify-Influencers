import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const InfluencerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { searchQuery, isSpecificSearch } = location.state || {};
  const secondToggle = location.state?.secondToggle || false;

  useEffect(() => {
    if (location.state?.influencers) {
      setInfluencers(location.state.influencers);
      setFilteredInfluencers(location.state.influencers);
      setLoading(false);
    } else {
      const fetchInfluencers = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:5000/api/influencers");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setInfluencers(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchInfluencers();
    }
  }, [location.state?.influencers]);
  
  const navigateToInfluencerDetail = (id) => {
    navigate(`/influencers/${id}`, {
      state: { 
        secondToggle,
        timeRange: location.state?.timeRange,
        claimsCount: location.state?.claimsCount
      }
    });
  };

  useEffect(() => {
    if (isSpecificSearch && searchQuery) {
      const filtered = influencers.filter(influencer =>
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInfluencers(filtered);
    } else {
      setFilteredInfluencers(influencers);
    }
  }, [influencers, searchQuery, isSpecificSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-gray-100 p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-start items-center w-full px-6">
        <Link to="/research-tasks" className="flex items-center text-emerald-400 font-medium text-lg hover:text-emerald-700 mr-6">
          <ArrowLeft className="ml-8 mr-2 h-5 w-5" aria-hidden="true" />
          Back to Research Tasks
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mt-10">
        {filteredInfluencers.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold">No influencers found matching your search</h2>
          </div>
        ) : (
          filteredInfluencers.map((influencer) => (
            <div key={influencer._id} className="flex items-start gap-6 mb-12">
              <div 
                onClick={() => navigateToInfluencerDetail(influencer._id)} 
                className="cursor-pointer"
              >
                <img
                  src={influencer.imageUrl || 'default-profile-image-url'}
                  alt={influencer.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 
                  className="text-4xl font-bold mb-2 cursor-pointer"
                  onClick={() => navigateToInfluencerDetail(influencer._id)}
                >
                  {influencer.name}
                </h1>
                <div className="flex">
                  <p className="text-gray-400 leading-relaxed mr-1">Trust Score</p>
                  <p className={`flex items-center
                          ${influencer.trustScore >= 90 ? 'text-emerald-400' : 
                            influencer.trustScore >= 80 ? 'text-yellow-400' :
                            influencer.trustScore >= 70 ? 'text-orange-400' : 'text-red-400'}
                      `} 
                  >
                    {influencer.trustScore}%
                  </p>
                </div>
                <p className="text-gray-400 leading-relaxed">{influencer.category}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default InfluencerPage;