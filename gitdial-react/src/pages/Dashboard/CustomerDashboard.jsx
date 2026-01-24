import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import CustomerOverview from '../../components/Dashboard/CustomerOverview';
import BookingTable from '../../components/Dashboard/BookingTable';

import UserProfile from '../../pages/Profile/UserProfile';

// Placeholder Pages
const Settings = () => <div className="p-8 text-center text-slate-500">Account Settings - Coming Soon</div>;

const CustomerDashboard = () => {
    return (
        <DashboardLayout role="customer">
            <Routes>
                <Route index element={<CustomerOverview />} />
                <Route path="requests" element={<BookingTable />} />
                <Route path="profile" element={<UserProfile role="customer" />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default CustomerDashboard;
