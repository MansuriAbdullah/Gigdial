import React from 'react';
import { Phone, User } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-white border-b border-slate-200 text-xs py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-slate-600">
        <div className="flex items-center hover:text-blue-600 transition-colors cursor-pointer">
          <Phone className="w-3 h-3 mr-2" />
          <span>Call us: +91 99999 99999</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-600 transition-colors flex items-center">
            <User className="w-3 h-3 mr-1" /> Customer Login
          </a>
          <a href="#" className="hover:text-primary-blue transition-colors text-primary-blue font-semibold">
            Gig Worker Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
