import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import AdminDashboard from './AdminDashboard';
import ManageWorkers from './ManageWorkers';
import ManageCustomers from './ManageCustomers';
import ManageCities from './ManageCities';
import AdminBookings from './AdminBookings';
import AdminAnalytics from './AdminAnalytics';
import ManageContent from './ManageContent';
import ServiceApprovals from './ServiceApprovals';
import Disputes from './Disputes';
import AdminSettings from './AdminSettings';

import ManageWithdrawals from './ManageWithdrawals';

const AdminPanel = () => {
    return (
        <DashboardLayout role="admin">
            <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="workers" element={<ManageWorkers />} />
                <Route path="customers" element={<ManageCustomers />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="withdrawals" element={<ManageWithdrawals />} />
                <Route path="disputes" element={<Disputes />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="services" element={<ServiceApprovals />} />
                <Route path="content" element={<ManageContent />} />
                <Route path="cities" element={<ManageCities />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default AdminPanel;
