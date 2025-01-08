import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader, X, Plus } from "lucide-react";
import { useClaimStore } from "../stores/useClaimStore";

const categories = [
  "Chronic Illness Management", "Cognition", "Endurance", "Emotional Regulation", "Exercise", 
  "Fitness", "Flexibility", "Gut Health", "Hormones", "Injury Prevention", "Longevity", 
  "Medicine", "Mental Health", "Metabolism", "Mindfulness", "Motivation", "Nutrition", 
  "Performance", "Recovery", "Sleep", "Stress"
];

const AddMultipleClaimsForm = () => {
  const [sharedData, setSharedData] = useState({
    category: [],
    link: "",
    name: "",
    date: "",
  });

  const [titles, setTitles] = useState([""]);
  const { addClaim, loading } = useClaimStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Submit a claim for each title with the shared metadata
      await Promise.all(titles.filter(title => title.trim()).map(title => 
        addClaim({
          ...sharedData,
          title: title.trim(),
        })
      ));
      console.log("Claims added successfully!");
      
      // Reset only the titles array, keeping other metadata
      setTitles([""]);
    } catch (error) {
      console.error("Error adding claims:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    setSharedData(prev => ({
      ...prev,
      category: isChecked
        ? [...prev.category, category]
        : prev.category.filter(cat => cat !== category)
    }));
  };

  const addNewTitle = () => {
    setTitles([...titles, ""]);
  };

  const removeTitle = (index) => {
    if (titles.length > 1) {
      setTitles(titles.filter((_, i) => i !== index));
    }
  };

  const updateTitle = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Add Multiple Claims</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Multiple Titles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-emerald-300">Claim Titles</h3>
            <button
              type="button"
              onClick={addNewTitle}
              className="text-emerald-500 hover:text-emerald-400"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          {titles.map((title, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={title}
                onChange={(e) => updateTitle(index, e.target.value)}
                placeholder="Enter claim title"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
              {titles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTitle(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Shared Data Section */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-emerald-300 mb-4">Shared Information</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={category}
                    checked={sharedData.category.includes(category)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600"
                  />
                  <label className="text-gray-300">{category}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-300">
                Link
              </label>
              <input
                type="url"
                id="link"
                value={sharedData.link}
                onChange={(e) => setSharedData({ ...sharedData, link: e.target.value })}
                placeholder="https://example.com"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={sharedData.name}
                onChange={(e) => setSharedData({ ...sharedData, name: e.target.value })}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={sharedData.date}
                onChange={(e) => setSharedData({ ...sharedData, date: e.target.value })}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>
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
              Add Claims ({titles.filter(t => t.trim()).length})
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddMultipleClaimsForm;