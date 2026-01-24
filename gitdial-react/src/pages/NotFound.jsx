import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
            <div className="text-9xl font-extrabold text-slate-100 mb-4 font-display">404</div>
            <h1 className="text-3xl font-bold text-dark-surface mb-2">Page Not Found</h1>
            <p className="text-slate-500 mb-8 max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary py-3 px-8 shadow-xl shadow-primary/20">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
