import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Shield, ArrowRight, PenSquare, Trash2, Settings, Smartphone, LayoutGrid } from 'lucide-react';

const ServiceCard = ({ title, icon: Icon, onClick }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 flex flex-col items-center text-center group transition-all"
    >
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors mb-4 border border-slate-100">
            <Icon size={24} />
        </div>
        <h3 className="text-lg font-black text-slate-800 mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-2 w-full">
            <button 
                onClick={onClick}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
            >
                Book Now
            </button>
            <button 
                onClick={onClick}
                className="py-2.5 bg-blue-100/50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
            >
                Book Now
            </button>
        </div>
    </motion.div>
);

const ServiceGrid = () => {
    const navigate = useNavigate();

    const services = [
        { title: 'Plumber', icon: Users },
        { title: 'Electrician', icon: Zap },
        { title: 'AC Repair', icon: Smartphone },
        { title: 'AC Repair', icon: LayoutGrid },
        { title: 'Painter', icon: Users },
        { title: 'Cleaning', icon: Trash2 },
        { title: 'RO Service', icon: Settings },
        { title: 'See All Services', icon: LayoutGrid, special: true }
    ];

    return (
        <section className="py-20 bg-slate-50/50" id="services">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">45+ Services Available</h2>
                    <p className="text-slate-500 font-bold">Most popular and frequently booked services</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        service.special ? (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate('/services')}
                                className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-blue-300 transition-all h-full"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 mb-4">
                                    <service.icon size={24} />
                                </div>
                                <h3 className="text-lg font-black text-slate-700 tracking-tight">{service.title}</h3>
                            </motion.button>
                        ) : (
                            <ServiceCard 
                                key={index} 
                                title={service.title} 
                                icon={service.icon} 
                                onClick={() => navigate('/services')}
                            />
                        )
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button 
                        onClick={() => navigate('/services')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/10"
                    >
                        View All Services <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
