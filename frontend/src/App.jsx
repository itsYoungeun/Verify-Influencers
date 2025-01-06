import { Navigate, Route, Routes } from 'react-router-dom';
import { useUserStore } from './stores/useUserStore';
import { Toaster } from 'react-hot-toast';

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
  const { user } = useUserStore();

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/influencers" element={<InfluencerPage />} />
          <Route path="/influencers/:id" element={<InfluencerDetailPage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path="/research-tasks" element={<ResearchTasksPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/monetization" element={<MonetizationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App