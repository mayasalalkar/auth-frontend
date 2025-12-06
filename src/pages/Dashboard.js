import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <div className="min-h-screen px-4 py-12 relative overflow-hidden">
            <ThemeToggle />

            {/* Animated Background */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Welcome Back! 🎉
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        You're successfully logged in
                    </p>
                </div>

                {/* User Card */}
                <div className="card mb-8 animate-slide-up">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {user?.name || 'User'}
                            </h2>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                                    <Mail className="w-5 h-5" />
                                    <span>{user?.email || 'user@example.com'}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                    <span>Joined {new Date(user?.createdAt).toLocaleDateString() || 'Today'}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-green-600 dark:text-green-400">
                                    <Shield className="w-5 h-5" />
                                    <span className="font-semibold">Verified Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="btn-secondary flex items-center gap-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
                    <div className="card text-center hover:shadow-2xl transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Your data is encrypted and protected
                        </p>
                    </div>

                    <div className="card text-center hover:shadow-2xl transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Verified</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Email verified with OTP authentication
                        </p>
                    </div>

                    <div className="card text-center hover:shadow-2xl transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Profile</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Manage your account settings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
