import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="h-6 w-6 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
