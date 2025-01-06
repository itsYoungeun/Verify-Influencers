import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useResearchStore } from "../stores/useResearchStore"; // Adjust this import to your store's path

const categories = [
  "Sleep", "Performance", "Hormones", "Nutrition", "Exercise", 
  "Stress", "Cognition", "Motivation", "Recovery", "Mental Health"
]; // Example categories

const AddResearchForm = () => {
  const [newResearch, setNewResearch] = useState({
    category: [], // Array to store selected categories
    title: "",
    link: "",
    journal: "",
  });

  const { addResearch, loading } = useResearchStore(); // Adjust this to match your research store

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addResearch(newResearch); // Call the store's function to add the research
      console.log("Research added successfully!");
      setNewResearch({
        category: [], // Reset categories after submission
        title: "",
        link: "",
        journal: "",
      });
    } catch (error) {
      console.error("Error adding research:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    setNewResearch((prevResearch) => {
      const updatedCategories = isChecked
        ? [...prevResearch.category, category] // Add category to the array
        : prevResearch.category.filter((cat) => cat !== category); // Remove category from the array if unchecked
      return { ...prevResearch, category: updatedCategories };
    });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Add New Research</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={newResearch.category.includes(category)} // Check if the category is already selected
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600"
                />
                <label className="text-gray-300">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="journal" className="block text-sm font-medium text-gray-300">
            Journal
          </label>
          <input
            type="text"
            id="journal"
            value={newResearch.journal}
            onChange={(e) => setNewResearch({ ...newResearch, journal: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newResearch.title}
            onChange={(e) => setNewResearch({ ...newResearch, title: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-300">
            Link
          </label>
          <input
            type="url"
            id="link"
            value={newResearch.link}
            onChange={(e) => setNewResearch({ ...newResearch, link: e.target.value })}
            placeholder="https://example.com"
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
              Add Research
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddResearchForm;