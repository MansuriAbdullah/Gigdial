import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import WorkerOverview from './Worker/WorkerOverview';
import WorkerProfile from './Worker/WorkerProfile';
import WorkerLeads from './Worker/WorkerLeads';
import WorkerServices from './Worker/WorkerServices';
import WorkerBookings from './Worker/WorkerBookings';
import WorkerEarnings from './Worker/WorkerEarnings';
import WorkerSettings from './Worker/WorkerSettings';
import WorkerMessages from './Worker/WorkerMessages';

const WorkerDashboard = () => {
    return (
        <DashboardLayout role="worker">
            <Routes>
                <Route index element={<WorkerOverview />} />
                <Route path="leads" element={<WorkerLeads />} />
                <Route path="services" element={<WorkerServices />} />
                <Route path="bookings" element={<WorkerBookings />} />
                <Route path="messages" element={<WorkerMessages />} />
                <Route path="earnings" element={<WorkerEarnings />} />
                <Route path="profile" element={<WorkerProfile />} />
                <Route path="settings" element={<WorkerSettings />} />
                <Route path="*" element={<Navigate to="" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default WorkerDashboard;
