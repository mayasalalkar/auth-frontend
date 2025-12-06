import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {/* Cover Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                    <div className="p-6 md:p-8 relative">
                        {/* Avatar */}
                        <div className="absolute -top-16 left-6 md:left-8">
                            <div className="w-32 h-32 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold text-white uppercase">
                                    {user?.name?.[0] || 'U'}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 truncate">{user?.name || 'User Name'}</h2>
                            <p className="text-gray-500 dark:text-gray-400">Software Engineer | Admin</p>

                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                        <p className="font-medium text-gray-900 dark:text-white truncate" title={user?.email}>{user?.email}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined On</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(user?.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            <p className="font-medium text-gray-900 dark:text-white">Active & Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
