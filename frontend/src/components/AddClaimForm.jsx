import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";
import { useClaimStore } from "../stores/useClaimStore"; // Adjust this import to your store's path

const categories = ["Sleep", "Performance", "Hormones", "Nutrition", "Exercise", "Stress", "Cognition", "Motivation", "Recovery", "Mental Health"]; // Example categories

const AddClaimForm = () => {
  const [newClaim, setNewClaim] = useState({
    category: [], // Array to store selected categories
    title: "",
    link: "",
    date: "",
  });

  const { addClaim, loading } = useClaimStore(); // Adjust this to match your claim store

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addClaim(newClaim); // Call the store's function to add the claim
      console.log("Claim added successfully!");
      setNewClaim({
        category: [], // Reset categories after submission
        title: "",
        link: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding claim:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;

    setNewClaim((prevClaim) => {
      const updatedCategories = isChecked
        ? [...prevClaim.category, category] // Add category to the array
        : prevClaim.category.filter((cat) => cat !== category); // Remove category from the array if unchecked
      return { ...prevClaim, category: updatedCategories };
    });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Add New Claim</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category}
                  checked={newClaim.category.includes(category)} // Check if the category is already selected
                  onChange={handleCategoryChange}
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600"
                />
                <label className="text-gray-300">{category}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newClaim.title}
            onChange={(e) => setNewClaim({ ...newClaim, title: e.target.value })}
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
            value={newClaim.link}
            onChange={(e) => setNewClaim({ ...newClaim, link: e.target.value })}
            placeholder="https://example.com"
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
            value={newClaim.date}
            onChange={(e) => setNewClaim({ ...newClaim, date: e.target.value })}
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
              Add Claim
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddClaimForm;
