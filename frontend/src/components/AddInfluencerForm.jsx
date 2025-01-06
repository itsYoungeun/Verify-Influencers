import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useInfluencerStore } from "../stores/useInfluencerStore";

const categories = ["Medicine", "Nutrition", "Fitness", "Mental Health"];

const AddInfluencerForm = () => {
  const [newInfluencer, setNewInfluencer] = useState({
    name: "",
    category: "",
    trustScore: "",
    trend: "",
    followers: "",
    verifiedClaims: "",
    bio: "",
    imageUrl: "",
  });

  const { addInfluencer, loading } = useInfluencerStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addInfluencer(newInfluencer); // Correctly call addInfluencer from useInfluencerStore
      console.log("Influencer added successfully!");
    } catch (error) {
      console.error("Error adding influencer:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Add Health Influencer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={newInfluencer.name}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, name: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={newInfluencer.category}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, category: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="trustScore" className="block text-sm font-medium text-gray-300">
            Trust Score
          </label>
          <input
            type="number"
            id="trustScore"
            value={newInfluencer.trustScore}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, trustScore: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="trend" className="block text-sm font-medium text-gray-300">
            Trend
          </label>
          <select
            id="trend"
            value={newInfluencer.trend}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, trend: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select a trend</option>
            <option value="up">Up</option>
            <option value="down">Down</option>
          </select>
        </div>

        <div>
          <label htmlFor="followers" className="block text-sm font-medium text-gray-300">
            Followers
          </label>
          <input
            type="text"
            id="followers"
            value={newInfluencer.followers}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, followers: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="verifiedClaims" className="block text-sm font-medium text-gray-300">
            Verified Claims
          </label>
          <input
            type="number"
            id="verifiedClaims"
            value={newInfluencer.verifiedClaims}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, verifiedClaims: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
            Bio
          </label>
          <textarea
            id="bio"
            value={newInfluencer.bio}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, bio: e.target.value })}
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={newInfluencer.imageUrl}
            onChange={(e) => setNewInfluencer({ ...newInfluencer, imageUrl: e.target.value })}
            placeholder="Enter the image URL"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Influencer
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddInfluencerForm;