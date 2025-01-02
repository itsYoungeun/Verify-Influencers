import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react"; // Import the gear icon from lucide-react

const ResearchTasksPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
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

        <div className="flex justify-between">
          {/* Left container */}
          <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg w-1/2 mr-2">
            <span className="text-lg font-medium text-white">Specific Influencer</span>
            <p>Research a known health influencer by name</p>
          </div>

          {/* Right container */}
          <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg w-1/2 ml-2">
            <span className="flex justify-center text-lg font-medium text-white">Discover New</span>
            <p>Find and analyze new health influencers</p>
          </div>
        </div>

        <div className="flex justify-between">
            {/* Left container */}
            <div className="flex flex-col">
                <h1>Time Range</h1>
                <h1>Influencer Name</h1>
                <h1>Claims to Analyze Per Influencer</h1>
            </div>

            {/* Right container */}
            <div className="flex flex-col">
                <h1>Products to Find Per Influencer</h1>
            </div>
        </div>

        <div className="flex justify-between">
            <h1>Scientific Journals</h1>
        </div>
      </div>
    </div>
  );
};

export default ResearchTasksPage;