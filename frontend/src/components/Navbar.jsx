import { Shield, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";

    return (
        <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Link to='/' className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
                        <Shield size={28} className='mr-2' />
                        VerifyInfluencers
                    </Link>

                    <nav className='flex flex-wrap items-center gap-8'>
                        <Link
                            to={"/leaderboard"}
                            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                        >
                            Leaderboard
                        </Link>
                        <Link
                            to={"/products"}
                            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                        >
                            Products
                        </Link>
                        <Link
                            to={"/monetization"}
                            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                        >
                            Monetization
                        </Link>
                        <Link
                            to={"/about"}
                            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                        >
                            About
                        </Link>
                        <Link
                            to={"/contact"}
                            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                        >
                            Contact
                        </Link>
                        {isAdmin && (
                            <Link
                                to={"/secret-dashboard"}
                                className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
                            >
                                Admin
                            </Link>
                        )}
                        {user ? (
                            <button
                                onClick={logout}
                                className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out items-center flex'
                            >
                                <LogOut size={20} className='mr-2' />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to={"/login"}
                                className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out items-center flex'
                            >
                                <LogIn size={20} className='mr-2' />
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
