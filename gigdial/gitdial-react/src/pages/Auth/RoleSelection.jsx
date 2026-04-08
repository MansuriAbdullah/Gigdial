import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full mix-blend-multiply animate-float"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[100px] rounded-full mix-blend-multiply animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container max-w-5xl mx-auto relative z-10 px-4">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-8 group focus:outline-none">
                        <img src="/images/gigdial-logo.png" alt="GigDial" className="h-10 sm:h-12 w-auto mx-auto group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-800 mb-4">Join GigDial</h1>
                    <p className="text-slate-500 text-lg">Choose how you want to use our platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Customer Option */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => navigate('/register/customer')}
                        className="bg-white rounded-3xl p-8 border-2 border-transparent hover:border-primary/30 shadow-xl shadow-slate-200/50 hover:shadow-primary/20 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <User size={120} />
                        </div>
                        
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                            <User size={32} />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-800 mb-3 relative z-10">Sign up as Customer</h2>
                        <p className="text-slate-500 mb-8 max-w-sm relative z-10">Find top-rated professionals for your needs instantly. Secure booking and satisfaction guaranteed.</p>
                        
                        <div className="inline-flex items-center text-blue-600 font-bold group-hover:text-blue-700 relative z-10">
                            Create Customer Account <ArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" size={18} />
                        </div>
                    </motion.div>

                    {/* Worker Option */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => navigate('/register/worker')}
                        className="bg-slate-900 rounded-3xl p-8 border-2 border-transparent hover:border-secondary/30 shadow-xl shadow-slate-900/20 hover:shadow-secondary/20 cursor-pointer transition-all duration-300 group relative overflow-hidden text-white"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <Briefcase size={120} />
                        </div>

                        <div className="w-16 h-16 bg-slate-800 text-secondary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-slate-900 transition-all duration-300 shadow-sm relative z-10">
                            <Briefcase size={32} />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3 relative z-10">Sign up as Professional</h2>
                        <p className="text-slate-400 mb-8 max-w-sm relative z-10">Be your own boss. Earn more with 0% commission, get paid instantly, and grow your business.</p>
                        
                        <div className="inline-flex items-center text-secondary-light font-bold group-hover:text-secondary relative z-10">
                            Create Professional Account <ArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" size={18} />
                        </div>
                    </motion.div>
                </div>
                
                <p className="text-center text-slate-500 mt-10">
                    Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default RoleSelection;
