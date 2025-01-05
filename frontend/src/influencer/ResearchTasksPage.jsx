import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Plus, Search } from "lucide-react"; // Import the gear icon from lucide-react
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const ResearchTasksPage = () => {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [timeButton, setTimeButton] = useState(null);
  const [firstToggle, setFirstToggle] = useState(false);
  const [secondToggle, setSecondToggle] = useState(false);
  const existingJournals = [
    "PubMed Central",
    "Nature",
    "Science",
    "Cell",
    "The Lancet",
    "New England Journal of Medicine",
    "JAMA"
  ];
  const [selectedJournals, setSelectedJournals] = useState([
    "New England Journal of Medicine",
    "PubMed Central",
    "Nature",
    "Science",
    "Cell",
    "The Lancet"
  ]);
  const [isAdding, setIsAdding] = useState(false); // Track if adding new journal
  const [newJournal, setNewJournal] = useState(''); // Track the journal input
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [discoverActive, setDiscoverActive] = useState(false); // For Discover
  const [specificActive, setSpecificActive] = useState(false); // For Specific
  const [searchQuery, setSearchQuery] = useState("");
  const [claimsCount, setClaimsCount] = useState(50);

  useEffect(() => {
    axios.get("http://localhost:5000/influencers") // Replace with your API URL
      .then(response => setInfluencers(response.data))
      .catch(error => console.error("Error fetching profiles:", error));
  }, []);

  useEffect(() => {
    const fetchInfluencers = async () => {
      const response = await fetch('http://localhost:5000/api/influencers');
      const data = await response.json();
      setInfluencers(data);
    };

    fetchInfluencers();
  }, []);

  const handleButtonClick = (buttonId) => {
    setActiveButton((prev) => (prev === buttonId ? null : buttonId));
    setDiscoverActive(buttonId === "discover");
    setSpecificActive(buttonId === "specific");
    if (buttonId !== "specific") {
      setSearchQuery("");
    }
  };

  const handleSearch = () => {
    if (specificActive && searchQuery.trim()) {
      const filteredResults = influencers.filter((influencer) =>
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const resultsWithClaims = filteredResults.map((influencer) => ({
        ...influencer
      }));
  
      navigate("/influencers", {
        state: {
          searchQuery: searchQuery.trim(),
          isSpecificSearch: true,
          influencers: resultsWithClaims,
        },
      });
    }
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

  const toggleJournalSelection = (journal) => {
    setSelectedJournals((prevSelected) =>
      prevSelected.includes(journal)
        ? prevSelected.filter((item) => item !== journal)
        : [...prevSelected, journal]
    );
  };

  // Handle input change (for journal suggestions)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewJournal(value);

    // Filter suggestions based on input (case-insensitive)
    if (value) {
      const filteredSuggestions = existingJournals
        .filter((journal) =>
          journal.toLowerCase().includes(value.toLowerCase())
        )
        .filter((journal) => !selectedJournals.includes(journal)); // Remove already selected journals
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle journal submission
  const handleAddJournal = () => {
    // Check if the journal already exists in selected journals
    const journalExists = selectedJournals.some(
      (journal) => journal.toLowerCase() === newJournal.toLowerCase()
    );

    if (journalExists) {
      setError('Journal already added');
    } else {
      const journalIsValid = existingJournals.some(
        (journal) => journal.toLowerCase() === newJournal.toLowerCase()
      );

      if (journalIsValid) {
        setError('');
        setSelectedJournals([...selectedJournals, newJournal]); // Add the new journal to selected
        setIsAdding(false);
      } else {
        setError('Journal does not exist');
      }
    }
  };

  // Handle suggestion click (set input value to the suggestion)
  const handleSuggestionClick = (suggestion) => {
    setNewJournal(suggestion); // Set the input field to the clicked suggestion
    setSuggestions([]); // Clear the suggestions after selection
  };

  const handleStartResearch = () => {
    if (discoverActive) {
      // Shuffle influencers and get 10 random influencers
      const randomInfluencers = [...influencers]
        .sort(() => Math.random() - 0.5) // Random shuffle
        .slice(0, 10); // Slice to get the first 10 influencers
    
      navigate("/influencers", {
        state: {
          isDiscover: true,
          influencers: randomInfluencers,
        },
      });
    }
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
            className={`flex flex-col items-center p-4 rounded-lg w-1/2 mr-2 border border-gray-700 hover:border-emerald-500 ${
              activeButton === "specific" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
            }`}
          >
            <span className="text-lg font-medium text-white">Specific Influencer</span>
            <p>Research a known health influencer by name</p>
          </button>

          {/* Discover Button */}
          <button
            onClick={() => handleButtonClick("discover")}
            className={`flex flex-col items-center p-4 rounded-lg w-1/2 ml-2 border border-gray-700 hover:border-emerald-500 ${
              activeButton === "discover" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
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
                className={`flex flex-col items-center p-2 rounded-lg w-full mr-1 border border-gray-700 hover:border-emerald-500 ${
                  timeButton === "week" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="text-lg font-medium text-white">Last Week</span>
              </button>
              {/* Month */}
              <button
                onClick={() => handleTimeButtonClick("month")}
                className={`flex flex-col items-center p-2 rounded-lg w-full ml-1 border border-gray-700 hover:border-emerald-500 ${
                  timeButton === "month" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="flex justify-center text-lg font-medium text-white">Last Month</span>
              </button>
            </div>
            <div className="flex justify-between w-full">
              {/* Year */}
              <button
                onClick={() => handleTimeButtonClick("year")}
                className={`flex flex-col items-center p-2 rounded-lg w-full mr-1 border border-gray-700 hover:border-emerald-500 ${
                  timeButton === "year" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="text-lg font-medium text-white">Last Year</span>
              </button>
              {/* All Time */}
              <button
                onClick={() => handleTimeButtonClick("all time")}
                className={`flex flex-col items-center p-2 rounded-lg w-full ml-1 border border-gray-700 hover:border-emerald-500 ${
                  timeButton === "all time" ? "bg-emerald-900 border-emerald-400 border-2" : "bg-gray-700"
                }`}
              >
                <span className="flex justify-center text-lg font-medium text-white">All Time</span>
              </button>
            </div>
            {/* Search By Influencer Name */}
            <h1 className="pt-4">Influencer Name</h1>
            <div className={`flex items-center bg-gray-900 rounded-md border 
              ${activeButton === "specific" 
                ? "border-gray-700 hover:border-emerald-500" 
                : "border-gray-600 opacity-50"
              } w-full h-9 mt-2 pl-2 text-white`}>
              <Search className="ml-1 mr-2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="bg-transparent flex-grow focus:outline-none"
                placeholder="Enter influencer name"
                value={searchQuery}
                onChange={(e) => activeButton === "specific" ? setSearchQuery(e.target.value) : null}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                disabled={activeButton !== "specific"}
              />
            </div>
            {/* Claims to Analyze Per Influencer */}
            <div className="w-full">
              <h1 className="pt-4">Claims to Analyze Per Influencer</h1>
              <input 
                type="number" 
                className="bg-gray-900 rounded-md border border-gray-700 hover:border-emerald-500 
                w-full h-9 mt-2 pl-2 focus:outline-none" 
                min="0" 
                max="100"
                value={claimsCount}
                onChange={(e) => setClaimsCount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                step="1" 
                inputMode="numeric"
              />
              <p className="text-gray-300">Recommended: 50-100 claims for comprehensive analysis</p>
            </div>
          </div>

          {/* Right container */}
          <div className="flex flex-col items-start w-1/2 p-2 pt-4">
            <h1>Products to Find Per Influencer</h1>
            <input 
              type="number" 
              className="bg-gray-900 rounded-md border border-gray-700 hover:border-emerald-500 
              w-full h-9 mt-2 pl-2 focus:outline-none" 
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
                  className="toggle-slider ml-auto border-2 border-gray-700 hover:border-emerald-500"
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
                  className="toggle-slider ml-auto border-2 border-gray-700 hover:border-emerald-500"
                />
              </div>
              <p className="text-gray-300">Cross-reference claims with scientific literature</p>
            </div>
          </div>
        </div>

        {/* Flex Container for "Scientific Journals" */}
        <div className="flex justify-between items-center">
          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium text-gray-300 mt-4 mb-3">
              Scientific Journals
            </label>
            <div className="grid grid-cols-2 gap-2">
              {selectedJournals.map((journal) => (
                <button
                  key={journal}
                  onClick={() => toggleJournalSelection(journal)}
                  className={`flex items-center justify-between px-4 py-2 text-sm rounded-md border 
                    space-x-2 w-full 
                    ${selectedJournals.includes(journal) ? "bg-emerald-900 border-emerald-500" : "bg-gray-900 border-gray-700"}
                    hover:border-emerald-500`}
                >
                  <span>{journal}</span>
                  {selectedJournals.includes(journal) && (
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add New Journal */}
        <div className="flex">
          <Link
            onClick={() => setIsAdding(true)}
            className="flex items-center text-emerald-500 mt-3 hover:text-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="text-sm">Add New Journal</span>
          </Link>
        </div>

        {/* Input to add new journal */}
        {isAdding && (
          <div className="mt-4">
            <input
              type="text"
              value={newJournal}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm w-full"
              placeholder="Enter new journal name"
            />
            
            {/* Suggestions list */}
            {suggestions.length > 0 && (
              <ul className="mt-2 bg-gray-800 p-2 rounded-md border border-gray-700">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-2 py-1 hover:bg-emerald-600 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)} // Handle click
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            {/* Button to add journal */}
            <div className="flex justify-between mt-2">
              <button
                onClick={handleAddJournal}
                className="px-4 py-2 bg-emerald-500 text-white rounded-md text-sm"
              >
                Add Journal
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
            
            {/* Error message */}
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>
        )}

        {/* Research Textarea */}
        <h1 className="mt-4">Notes for Research Assistant</h1>
        <textarea 
          className="bg-gray-900 rounded-md border border-gray-700 hover:border-emerald-500 
              w-full h-24 mt-2 pl-4 p-2 focus:outline-none"
          placeholder="Add any specific instructions or focus areas..."></textarea>

        {/* Flex container for "Start Research" button */}
        <div className="flex items-end justify-end">
          <button
            onClick={discoverActive ? handleStartResearch : handleSearch}
            disabled={!discoverActive && !(specificActive && searchQuery.trim())}
            className={`flex items-center px-6 py-3 ${
              discoverActive || (specificActive && searchQuery.trim())
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-600 cursor-not-allowed"
            } text-white font-medium text-lg rounded-md shadow-md mt-8`}
          >
            <Plus className="h-6 w-6 mr-2" aria-hidden="true" />
            Start Research
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResearchTasksPage;