import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import TopBar from '../components/Layout/TopBar';
import { MessageCircle } from 'lucide-react';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-light-bg text-dark relative">
            <TopBar />
            <Header />
            <main className="flex-grow"> {/* Offset for fixed header */}
                <Outlet />
            </main>
            <Footer />

            {/* WhatsApp Widget removed (rendered globally in App.jsx) */}
        </div>
    );
};

export default MainLayout;
