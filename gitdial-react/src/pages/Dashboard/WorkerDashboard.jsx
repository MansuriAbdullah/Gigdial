import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Overview from '../../components/Dashboard/Overview';
import BookingTable from '../../components/Dashboard/BookingTable';

import UserProfile from '../../pages/Profile/UserProfile';

// Placeholder Pages
const Earnings = () => <div className="p-8 text-center text-slate-500">Earnings Page - Coming Soon</div>;

const WorkerDashboard = () => {
    return (
        <DashboardLayout role="worker">
            <Routes>
                <Route index element={<Overview />} />
                <Route path="bookings" element={<BookingTable />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="profile" element={<UserProfile role="worker" />} />
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default WorkerDashboard;
