import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import TopBar from '../components/Layout/TopBar';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-light-bg text-dark">
            <TopBar />
            <Header />
            <main className="flex-grow pt-[80px]"> {/* Offset for fixed header */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
