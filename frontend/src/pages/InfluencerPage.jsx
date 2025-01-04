import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InfluencerPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/influencers'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-gray-100 p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {influencers.map((influencer) => (
          <div key={influencer.rank} className="flex items-start gap-6 mb-12">
            <img
              src={influencer.imageUrl || 'default-profile-image-url'}
              alt={influencer.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                <Link to={`/influencers/${influencer.name.toLowerCase().replace(/\s+/g, '')}`}>
                  {influencer.name}
                </Link>
              </h1>
              <p className="text-gray-400 leading-relaxed">{influencer.category}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InfluencerPage;