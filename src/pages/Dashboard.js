import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Users, Mail, Calendar, Shield, TrendingUp, DollarSign, Activity, Settings, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const { data } = await axios.get('https://auth-backend-0v2i.onrender.com/api/dashboard/stats', config);

                if (data.status === 'success') {
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statItems = [
        {
            label: 'Total Revenue',
            value: stats?.revenue?.value || '$0.00',
            change: stats?.revenue?.change || 'Loading...',
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-100 dark:bg-green-900/20'
        },
        {
            label: 'Active Users',
            value: stats?.activeUsers?.value || '0',
            change: stats?.activeUsers?.change || 'Loading...',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/20'
        },
        {
            label: 'Sales',
            value: stats?.sales?.value || '0',
            change: stats?.sales?.change || 'Loading...',
            icon: TrendingUp,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100 dark:bg-indigo-900/20'
        },
        {
            label: 'Active Now',
            value: stats?.activeNow?.value || '0',
            change: stats?.activeNow?.change || 'Loading...',
            icon: Activity,
            color: 'text-orange-600',
            bg: 'bg-orange-100 dark:bg-orange-900/20'
        },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 md:p-10 mb-8 shadow-xl">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Welcome back, {user?.name || 'User'}! 👋
                        </h1>
                        <p className="text-slate-200 text-lg max-w-2xl mb-6">
                            Here's what's happening with your projects today. You have pending items to review.
                        </p>
                        <button className="bg-white text-slate-900 hover:bg-slate-50 px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-lg">
                            View Reports
                        </button>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-20 -mb-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statItems.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                        {loading ? <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> : stat.value}
                                    </h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {loading ? (
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                ) : (
                                    <>
                                        <span className="text-green-500 font-medium">{stat.change.split(' ')[0]}</span> {stat.change.split(' ').slice(1).join(' ')}
                                    </>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Details Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-primary-500" />
                                Profile Information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{user?.email || 'user@example.com'}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full dark:bg-green-900/30 dark:text-green-400">Verified</span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                                            <p className="text-gray-900 dark:text-white font-medium">{new Date(user?.createdAt).toLocaleDateString() || 'Nov 2023'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column / Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                                            <Settings size={18} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Account Settings</span>
                                    </div>
                                    <div className="text-gray-400">→</div>
                                </button>

                                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors text-left group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                            <Shield size={18} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Security</span>
                                    </div>
                                    <div className="text-gray-400">→</div>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-between p-3 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors text-left group mt-4 border-t border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                            <LogOut size={18} />
                                        </div>
                                        <span className="text-red-600 font-medium">Log Out</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
