import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/Shared/ScrollToTop';
import WhatsAppWidget from './components/Common/WhatsAppWidget';

// Lazy Load Pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const CustomerRegister = React.lazy(() => import('./pages/Auth/CustomerRegister'));
const WorkerDashboard = React.lazy(() => import('./pages/Dashboard/WorkerDashboard'));
const CustomerDashboard = React.lazy(() => import('./pages/Dashboard/CustomerDashboard'));
const AdminPanel = React.lazy(() => import('./pages/Admin/AdminPanel'));
const ServiceCatalog = React.lazy(() => import('./pages/Services/ServiceCatalog'));
const ServiceDetail = React.lazy(() => import('./pages/Services/ServiceDetail'));
const BrowseWorkers = React.lazy(() => import('./pages/BrowseWorkers'));
const WorkerPublicProfile = React.lazy(() => import('./pages/WorkerPublicProfile'));
const Contact = React.lazy(() => import('./pages/Contact'));
const About = React.lazy(() => import('./pages/About'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">Loading GigDial...</p>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  // Helper to determine route key - keeps Dashboards mounted during sub-navigation
  const getPageKey = (path) => {
    if (path.startsWith('/worker-dashboard')) return 'worker-dashboard';
    if (path.startsWith('/customer-dashboard')) return 'customer-dashboard';
    if (path.startsWith('/admin')) return 'admin';
    return path;
  };

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />} key={getPageKey(location.pathname)}>
          <Routes location={location}>
            {/* Public Routes with Main Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<ServiceCatalog />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/workers" element={<BrowseWorkers />} />
              <Route path="/workers/:id" element={<WorkerPublicProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Auth Routes (No Header/Footer) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/customer" element={<CustomerRegister />} />

            {/* Dashboard Routes (Custom Layout) */}
            <Route path="/worker-dashboard/*" element={<WorkerDashboard />} />
            <Route path="/customer-dashboard/*" element={<CustomerDashboard />} />
            <Route path="/admin/*" element={<AdminPanel />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AnimatedRoutes />
          <WhatsAppWidget />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
