import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 overflow-y-auto">
      <h1
        className="text-4xl font-extrabold mb-4"
        style={{ fontFamily: "'Merriweather', serif", color: 'white' }}
      >
        Health Claim Verification Platform
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl">
        Cut through the noise of online health advice with our revolutionary platform. 
        We verify health claims from popular influencers using credible, peer-reviewed scientific research. 
        Our mission? To empower you with honest, evidence-based guidance so you can make informed decisions about your well-being. 
        Explore with confidence—your journey to trustworthy health advice starts here!
      </p>
      <div className="mt-6">
        <Link to="/research-tasks">
          <button
            className="px-6 py-3 bg-emerald-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Research Influencers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;