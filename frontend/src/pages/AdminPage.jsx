import { motion } from "framer-motion";
import { BarChart, PlusCircle, Cross, ShoppingCart } from "lucide-react";
import { useState } from "react";
import AddInfluencer from "../components/addInfluencerForm";
import AddClaim from "../components/addClaimForm";
import AddResearch from "../components/addResearchForm";

const tabs = [
	{ id: "influencer", label: "Add Influencer", icon: PlusCircle },
	{ id: "claims", label: "Add Claim", icon: Cross },
	{ id: "research", label: "Add Research", icon: BarChart },
  { id: "product", label: "Add Product", icon: ShoppingCart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <motion.div 
      className='min-h-screen relative overflow-hidden'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
			<div className='relative z-10 container mx-auto px-4 py-16'>
				<h1
					className='text-4xl font-bold mb-8 text-emerald-400 text-center'
				>
					Admin Dashboard
				</h1>

				<div className='flex justify-center mb-8'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>
				{activeTab === "influencer" && <AddInfluencer />}
				{activeTab === "claims" && <AddClaim />}
				{activeTab === "research" && <AddResearch />}
        {/* {activeTab === "product" && <ProductPage />} */}
			</div>
		</motion.div>
  )
}

export default AdminPage;