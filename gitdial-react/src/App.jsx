import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import WorkerDashboard from './pages/Dashboard/WorkerDashboard';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard';
import ServiceCatalog from './pages/Services/ServiceCatalog';
import ServiceDetail from './pages/Services/ServiceDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import ScrollToTop from './components/Shared/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServiceCatalog />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Auth Routes (No Header/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes (Custom Layout) */}
        <Route path="/worker-dashboard/*" element={<WorkerDashboard />} />
        <Route path="/customer-dashboard/*" element={<CustomerDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
