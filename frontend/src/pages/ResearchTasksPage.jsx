import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Plus, Search } from "lucide-react"; // Import the gear icon from lucide-react
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const ResearchTasksPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [timeButton, setTimeButton] = useState(null);
  const [firstToggle, setFirstToggle] = useState(false);
  const [secondToggle, setSecondToggle] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/influencers") // Replace with your API URL
      .then(response => setInfluencers(response.data))
      .catch(error => console.error("Error fetching profiles:", error));
  }, []);

  const handleButtonClick = (buttonId) => {
    setActiveButton((prev) => (prev === buttonId ? null : buttonId));
  };

  const handleTimeButtonClick = (buttonId) => {
    setTimeButton((prev) => (prev === buttonId ? null : buttonId));
  };

  const handleFirstToggle = () => {
    setFirstToggle(!firstToggle);
  };

  const handleSecondToggle = () => {
    setSecondToggle(!secondToggle);
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gray-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Flex container for "Back to Dashboard" and "Research Tasks" text */}
      <div className="flex justify-start items-center w-full px-6 py-4">
        <Link to="/" className="flex items-center text-emerald-400 font-medium text-lg hover:text-emerald-700 mr-6">
          <ArrowLeft className="ml-8 mr-2 h-5 w-5" aria-hidden="true" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">Research Tasks</h1>
      </div>

      {/* Research Configuration with Gear Icon and Rounded Border */}
      <div className="bg-gray-800 px-6 py-4 rounded-lg border border-gray-700 ml-14 mr-14">
        <div className="flex items-center mb-4">
          <Settings className="h-6 w-6 mr-3 text-emerald-700" aria-hidden="true" />
          <span className="text-xl font-medium">Research Configuration</span>
        </div>

        {/* Flex container for "Specific Influencer" and "Discover New" buttons */}
        <div className="flex justify-between">
          {/* Specific Button */}
          <button
            onClick={() => handleButtonClick("specific")}
            className={`flex flex-col items-center p-4 rounded-lg w-1/2 mr-2 ${
              activeButton === "specific" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
            }`}
          >
            <span className="text-lg font-medium text-white">Specific Influencer</span>
            <p>Research a known health influencer by name</p>
          </button>

          {/* Discover Button */}
          <button
            onClick={() => handleButtonClick("discover")}
            className={`flex flex-col items-center p-4 rounded-lg w-1/2 ml-2 ${
              activeButton === "discover" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
            }`}
          >
            <span className="flex justify-center text-lg font-medium text-white">Discover New</span>
            <p>Find and analyze new health influencers</p>
          </button>
        </div>

        {/* Flex container for "Specific Influencer" and "Discover New" categories */}
        <div className="flex justify-between">
          {/* Left container */}
          <div className="flex flex-col items-start w-1/2 pt-4 pr-2">
            <h1 className="mb-2">Time Range</h1>
            <div className="flex justify-between w-full mb-2">
              {/* Week */}
              <button
                onClick={() => handleTimeButtonClick("week")}
                className={`flex flex-col items-center p-2 rounded-lg w-full mr-1 ${
                  timeButton === "week" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="text-lg font-medium text-white">Last Week</span>
              </button>
              {/* Month */}
              <button
                onClick={() => handleTimeButtonClick("month")}
                className={`flex flex-col items-center p-2 rounded-lg w-full ml-1 ${
                  timeButton === "month" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="flex justify-center text-lg font-medium text-white">Last Month</span>
              </button>
            </div>
            <div className="flex justify-between w-full">
              {/* Year */}
              <button
                onClick={() => handleTimeButtonClick("year")}
                className={`flex flex-col items-center p-2 rounded-lg w-full mr-1 ${
                  timeButton === "year" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="text-lg font-medium text-white">Last Year</span>
              </button>
              {/* All Time */}
              <button
                onClick={() => handleTimeButtonClick("all time")}
                className={`flex flex-col items-center p-2 rounded-lg w-full ml-1 ${
                  timeButton === "all time" ? "bg-emerald-700 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="flex justify-center text-lg font-medium text-white">All Time</span>
              </button>
            </div>
            <h1 className="pt-4">Influencer Name</h1>
            <div className="flex items-center bg-gray-900 rounded-md border border-gray-700 w-full h-9 mt-2 pl-2 text-white">
              <Search className="ml-1 mr-2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="bg-transparent flex-grow focus:outline-none"
                placeholder="Enter influencer name"
              />
            </div>
            <h1 className="pt-4">Claims to Analyze Per Influencer</h1>
            <input 
              type="number" 
              className="bg-gray-900 rounded-md border border-gray-700 w-full h-9 mt-2 pl-2" 
              min="0" 
              max="100"
              step="any" 
              inputMode="numeric"
            />
            <p className="text-gray-300">Recommended: 50-100 claims for comprehensive analysis</p>
          </div>

          {/* Right container */}
          <div className="flex flex-col items-start w-1/2 p-2 pt-4">
            <h1>Products to Find Per Influencer</h1>
            <input 
              type="number" 
              className="bg-gray-900 rounded-md border border-gray-700 w-full h-9 mt-2 pl-2" 
              min="0" 
              max="10"
              step="any" 
              inputMode="numeric"
            />
            <p className="text-gray-300">Set to 0 to skip product research</p>
            {/* Slider Toggles Section */}
            <div className="flex flex-col mt-6 w-full">
              {/* First Slider Toggle */}
              <div className="flex items-center">
                <label className="mr-2 text-white">Include Revenue Analysis</label>
                <input
                  type="checkbox"
                  checked={firstToggle}
                  onChange={handleFirstToggle}
                  className="toggle-slider ml-auto"
                />
              </div>
              <p className="text-gray-300">Analysis monetization methods and estimate earnings</p>
              {/* Second Slider Toggle */}
              <div className="flex items-center mt-5">
                <label className="mr-2 text-white">Verify with Scientific Journals</label>
                <input
                  type="checkbox"
                  checked={secondToggle}
                  onChange={handleSecondToggle}
                  className="toggle-slider ml-auto"
                />
              </div>
              <p className="text-gray-300">Cross-reference claims with scientific literature</p>
            </div>
          </div>
        </div>

        {/* Flex Container for "Scientific Journals" */}
        <div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mt-4">Scientific Journals</label>
              <div className="flex flex-wrap gap-2">
                {['PubMed Central', 'Nature', 'Science', 'Cell', 'The Lancet'].map((journal) => (
                  <button
                    key={journal}
                    className="px-4 py-2 text-sm rounded-md bg-[#141821] border border-gray-700 hover:border-emerald-500 flex items-center space-x-2"
                  >
                    <span>{journal}</span>
                  </button>
                ))}
              </div>
            </div>
            <button className="flex items-center space-x-2 text-emerald-500 hover:text-emerald-400">
            </button>
          </div>
          <div className="flex items-center text-emerald-500">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add New Journal</span>
          </div>
        </div>    

        <div className="flex items-end justify-end">
          <Link 
            to="/influencers" //{`/influencers/${influencers.id}`} 
            key={influencers.id}
          >
            <div className="flex items-center px-6 py-3 bg-emerald-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-emerald-700">
              <Plus className="h-6 w-6 mr-2" aria-hidden="true" />
              Start Research
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ResearchTasksPage;