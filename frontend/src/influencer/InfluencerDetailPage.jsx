import { parseFollowers, calculateEarnings } from '../utils/calculateEarnings';
import { calculateClaimTrustScore } from '../utils/calculateClaimScore'
import { verificationStatuses, getVerificationStatus } from '../utils/verifyClaim';
import { sortClaims, filterClaimsByStatus } from '../utils/navigateClaims';
import { findBestResearchMatch } from '../utils/calculateResearch';

import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Calendar, 
  Filter, ExternalLink,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Brain
} from 'lucide-react';
import moment from 'moment';

const InfluencerDetailPage = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [filterCategories, setFilterCategories] = useState(['All Categories']);
  const [displayCategories, setDisplayCategories] = useState([]);

  const [claims, setClaims] = useState([]);
  const [sortBy, setSortBy] = useState('Date');
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const [activeTab, setActiveTab] = useState('Claims Analysis');
  const [searchQuery, setSearchQuery] = useState('');

  const [researchData, setResearchData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => navigate(-1);
  const secondToggle = location.state?.secondToggle || false;

  const categoryRelationships = {
    'Medicine': [
      'Sleep', 'Hormones', 'Mental Health', 'Recovery'
    ],
    'Fitness': [
      'Exercise', 'Performance', 'Nutrition', 'Recovery'
    ],
    'Nutrition': [
      'Sleep', 'Performance', 'Hormones', 'Mental Health'
    ],
    'Mental Health': [
      'Sleep', 'Stress', 'Cognition', 'Motivation'
    ]
  };

  const getRelatedCategories = (mainCategory) => {
    return [mainCategory, ...(categoryRelationships[mainCategory] || [])];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const influencerResponse = await fetch(`http://localhost:5000/api/influencers/${id}`);
        if (!influencerResponse.ok) throw new Error('Failed to fetch influencer details');
        const influencerData = await influencerResponse.json();
        setInfluencer(influencerData);

        if (influencerData.category) {
          const relatedCats = getRelatedCategories(influencerData.category);
          // Set display categories without "All Categories"
          setDisplayCategories(relatedCats);
          // Set filter categories with "All Categories"
          setFilterCategories(['All Categories', ...relatedCats]);

          // Fetch claims using all related categories
          const categoriesString = relatedCats.join(',');

          const claimsResponse = await fetch(
            `http://localhost:5000/api/claims?categories=${categoriesString}`
          );
          if (!claimsResponse.ok) throw new Error('Failed to fetch claims data');
          const claimsData = await claimsResponse.json();

          const enrichedClaims = claimsData.map(claim => ({
            ...claim
          }));

          setClaims(enrichedClaims);
          setFilteredClaims(enrichedClaims);

          // Fetch research data using the same categories
          const researchResponse = await fetch(
            `http://localhost:5000/api/research?categories=${categoriesString}`
          );
          if (!researchResponse.ok) throw new Error('Failed to fetch research data');
          const researchData = await researchResponse.json();
          // Match research to claims and store in state
          const matchedResearch = {};
          enrichedClaims.forEach(claim => {
            const bestMatch = findBestResearchMatch(claim.category, researchData);
            if (bestMatch) {
              matchedResearch[claim._id] = bestMatch;
            }
          });

          setResearchData(matchedResearch);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (claims.length > 0) {
      let filtered = claims;
  
      // Apply category filter
      if (selectedCategory !== 'All Categories') {
        filtered = filtered.filter(claim => 
          claim.category.includes(selectedCategory)
        );
      } else {
        // When "All Categories" is selected, shuffle the claims randomly based on influencer's categories
        const randomClaims = shuffleArray(filtered);
        filtered = randomClaims;
      }
  
      // Apply verification status filter
      filtered = filterClaimsByStatus(filtered, selectedStatus, secondToggle);
  
      // Apply time range filter if specified
      if (location.state?.timeRange) {
        const currentDate = moment();
        filtered = filtered.filter(claim => {
          const claimDate = moment(claim.date);
          
          switch(location.state.timeRange) {
            case 'week':
              return currentDate.diff(claimDate, 'days') <= 7;
            case 'month':
              return currentDate.diff(claimDate, 'days') <= 30;
            case 'year':
              return currentDate.diff(claimDate, 'days') <= 365;
            case 'all time':
              return true;
            default:
              return true;
          }
        });
      }

      // Apply sorting
      filtered = sortClaims(filtered, sortBy);

      // Apply search filter if there's a search query
      if (searchQuery) {
        filtered = filtered.filter(claim =>
          claim.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply claims count limit only if no time range is selected
      const maxClaims = location.state?.claimsCount || 50;
      if (!location.state?.timeRange) {
        filtered = filtered.slice(0, maxClaims);
      }

      setFilteredClaims(filtered);
    }
  }, [selectedCategory, selectedStatus, sortBy, claims, location.state, secondToggle, searchQuery]);

  // Helper function to shuffle the claims randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };

  // Filter claims based on the search query
  const filterClaims = (query) => {
    if (query) {
      return claims.filter((claim) =>
        claim.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    return [];
  };

  // Handle claim click, updating the filtered list to show only the clicked claim
  const handleClaimClick = (claim) => {
    setSearchQuery(claim.title); // Update search query to the selected claim
    setFilteredClaims([claim]); // Filter the list to show only the selected claim
  };

  if (loading) return <div className="min-h-screen bg-gray-900 p-8">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-900 p-8">Error: {error}</div>;

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
            className="w-24 h-24 rounded-full object-cover mt-12"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">{influencer.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {displayCategories.map((item, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-gray-400 w-3/4">{influencer.bio}</p>
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

        {/* Tabs for Claims, Products, or Monetization */}
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
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchQuery(query);
                  setFilteredClaims(filterClaims(query));
                }}
              />
            </div>

            {/* Display filtered claims */}
            <div>
              {searchQuery && filteredClaims.length > 0 ? (
                filteredClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className="claim-item cursor-pointer hover:bg-gray-700 rounded-lg p-2"
                    onClick={() => handleClaimClick(claim)}
                  >
                    <h3 className="text-white">{claim.title}</h3>
                    {/* Add more claim details here */}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No claims found.</p>
              )}
            </div>

            {/* Filters by Category */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-wrap gap-4 mb-6">
                {filterCategories.map((category) => (
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

              {/* Status by Verification */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {verificationStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)} // Update the selected status
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedStatus === status
                          ? 'bg-emerald-500 text-white' // Highlight the selected status
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* Filtered Claims */}
                <div>
                  {claims
                    .filter((claim) => {
                      // Check the claim's verification status matches the selected status
                      const claimStatus = getVerificationStatus(claim); // Assuming getVerificationStatus returns an array or a string
                      return selectedStatus === 'All' || claimStatus.includes(selectedStatus);
                    })
                    .map((claim) => (
                      <div key={claim.id} className="claim">
                        {/* Render each claim as needed */}
                        <span>{claim.name}</span>
                        <span>{getVerificationStatus(claim).join(', ')}</span> {/* Show the verification status */}
                      </div>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Date</option>
                    <option>Trust Score</option>
                  </select>
                  <button className="p-2 bg-gray-800 rounded-lg">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Claims List */}
            <div className="space-y-4">
              {filteredClaims.map((claim, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2 w-full">
                  {/* Left-aligned content */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-row gap-2">
                      {getVerificationStatus(claim, secondToggle).map((status, catIndex) => (
                        <span
                          key={catIndex}
                          className={`px-3 py-1 rounded-full text-xs ${
                            secondToggle
                              ? status === 'Verified'
                                ? 'bg-green-500/20 text-green-500'
                                : status === 'Questionable'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-red-500/20 text-red-500'
                              : 'bg-gray-500/20 text-white-500'
                          }`}
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{moment(claim.date).format('MM/DD/YYYY')}</span>
                  </div>
                  {/* Right-aligned trust score */}
                  <div className="ml-auto flex items-center">
                    <p
                      className={`text-gray-400 text-lg leading-relaxed ${
                        calculateClaimTrustScore(claim.date) >= 90
                          ? 'text-green-500'
                          : calculateClaimTrustScore(claim.date) >= 80
                          ? 'text-yellow-500'
                          : calculateClaimTrustScore(claim.date) >= 70
                          ? 'text-orange-500'
                          : 'text-red-500'
                      }`}
                    >
                      {calculateClaimTrustScore(claim.date)}%
                    </p>
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium mb-2">{claim.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-2">Trust Score</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <a
                        href={claim.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Source
                      </a>
                      <Link
                        to={claim.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  {/* AI Analysis */}
                  {secondToggle && (
                    <div className="flex flex-col items-start mt-6 ml-1 space-y-2">
                      {/* AI Analysis section */}
                      <div className="flex items-center gap-2">
                        <Brain className="text-emerald-400 p-1" />
                        <span>AI Analysis</span>
                      </div>

                      {/* Research description section */}
                      {researchData[claim._id] && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <p className="text-gray-400 font-medium ml-1">
                              {researchData[claim._id].title}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* View Research section */}
                      {researchData[claim._id] && (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <a
                            href={researchData[claim._id].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline ml-1"
                          >
                            View Research
                          </a>
                          <Link 
                            to={researchData[claim._id].link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
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