import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, HelpCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, isMobile, toggleSidebar }) => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Profile', path: '/profile' }, // Placeholder path
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Help', path: '/help' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Content */}
            <aside
                className={`fixed md:relative z-30 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col justify-between
          ${isOpen ? 'w-64' : 'w-0 md:w-20'} 
          ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
            >
                <div>
                    {/* Logo Area */}
                    <div className={`h-16 flex items-center ${isOpen ? 'justify-between px-6' : 'justify-center'} border-b border-gray-100 dark:border-gray-800`}>
                        {isOpen ? (
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                                BrandStore
                            </span>
                        ) : (
                            <span className="text-2xl font-bold text-primary-600">B</span>
                        )}

                        {isMobile && (
                            <button onClick={toggleSidebar} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                <X size={20} className="text-gray-500" />
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
                  ${isActive
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/10 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
                  ${!isOpen && 'justify-center px-2'}
                `}
                            >
                                <item.icon size={22} />
                                <span className={`whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                                    {item.label}
                                </span>

                                {/* Tooltip for collapsed state */}
                                {!isOpen && !isMobile && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                                        {item.label}
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    {isOpen ? (
                        <div className="text-xs text-gray-400 space-y-1">
                            <p className="font-medium text-gray-500 dark:text-gray-300">v1.0.0</p>
                            <p>Author: Maya Salalkar</p>
                        </div>
                    ) : (
                        <div className="text-xs text-center text-gray-400">
                            <div>v1</div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
