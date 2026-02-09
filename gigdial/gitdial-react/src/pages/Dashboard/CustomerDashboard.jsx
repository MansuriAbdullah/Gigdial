import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

// Import all customer pages
import CustomerHome from './Customer/CustomerHome';
import SavedAddresses from './Customer/SavedAddresses';
import WalletPage from './Customer/WalletPage';
import Favourites from './Customer/Favourites';
import ServiceHistory from './Customer/ServiceHistory';
import ReferAndEarn from './Customer/ReferAndEarn';
import BrowseServices from './Customer/BrowseServices';
import BrowseWorkers from './Customer/BrowseWorkers';
import CustomerMessages from './Customer/CustomerMessages';

const CustomerDashboard = () => {
    return (
        <DashboardLayout role="customer">
            <Routes>
                <Route index element={<CustomerHome />} />
                <Route path="browse-services" element={<BrowseServices />} />
                <Route path="browse-workers" element={<BrowseWorkers />} />
                <Route path="service-history" element={<ServiceHistory />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="messages" element={<CustomerMessages />} />
                <Route path="wallet" element={<WalletPage />} />
                <Route path="addresses" element={<SavedAddresses />} />
                <Route path="refer-earn" element={<ReferAndEarn />} />
                <Route path="*" element={<Navigate to="/customer-dashboard" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default CustomerDashboard;
