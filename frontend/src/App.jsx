import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProductPage from './pages/ProductPage';
import MonetizationPage from './pages/MonetizationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

import ResearchTasksPage from './influencer/ResearchTasksPage';
import InfluencerPage from './influencer/InfluencerPage';
import InfluencerDetailPage from './influencer/InfluencerDetailPage';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/influencers" element={<InfluencerPage />} />
          <Route path="/influencers/:id" element={<InfluencerDetailPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/research-tasks" element={<ResearchTasksPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/monetization" element={<MonetizationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App