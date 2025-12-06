import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 z-20">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar - Hidden on mobile, visible on tablet+ */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-transparent focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all w-64">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 w-full placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
                </button>

                <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
