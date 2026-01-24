import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, imgIndex, price }) => (
    <div className="flex-shrink-0 w-80 bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-slate-100 mr-6 hover:border-primary/20">
        <div className="h-48 overflow-hidden rounded-[1.5rem] relative mb-4">
            <img
                src={`https://images.unsplash.com/photo-${imgIndex}?auto=format&fit=crop&w=400&q=80`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                alt={title}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1581578731117-10452b7d702e?auto=format&fit=crop&w=400&q=80" }} // Fallback
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-dark-surface shadow-md">
                {price}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold bg-primary px-2 py-1 rounded-md">BOOK NOW</span>
            </div>
        </div>
        <div className="px-2 pb-2">
            <h3 className="font-display font-bold text-lg text-dark-surface mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex justify-between items-center text-slate-500 text-sm">
                <span>Starting at</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:rotate-[-45deg] duration-300">
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
    </div>
);

const ServiceSection = ({ title, services, sectionIndex }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={`py-16 ${sectionIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/services" className="group">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-surface group-hover:text-primary transition-colors flex items-center gap-2">
                            {title} <ArrowRight size={24} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h2>
                    </Link>
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 hover:bg-white hover:text-primary hover:border-primary hover:shadow-md transition-all text-slate-600 bg-white">
                            <ArrowLeft size={20} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 hover:bg-white hover:text-primary hover:border-primary hover:shadow-md transition-all text-slate-600 bg-white">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    // Better Image IDs (Unsplash)
    const digitalServices = [
        { title: "Website Development", price: "₹5000", imgIndex: "1547658719-da2b51169166" },
        { title: "Graphic Design", price: "₹1000", imgIndex: "1626785774573-4b7993143485" },
        { title: "Video Editing", price: "₹2000", imgIndex: "1574717162153-27dd87707328" },
        { title: "Social Media Mgmt", price: "₹3000", imgIndex: "1611162617789-28df5232cdcf" },
        { title: "SEO Optimization", price: "₹4000", imgIndex: "1572021335469-31706a17aaef" },
    ];

    const wellnessServices = [
        { title: "Yoga Instructor", price: "₹500", imgIndex: "1599901860904-17e6ed7083a0" },
        { title: "Personal Trainer", price: "₹800", imgIndex: "1571019614242-c5c5dee9f50b" },
        { title: "Nutritionist", price: "₹1000", imgIndex: "1490645935967-10de6ba17061" },
        { title: "Mental Therapy", price: "₹1500", imgIndex: "1529333166437-7750a6dd5a70" },
    ];

    const homeServices = [
        { title: "Electrician", price: "₹200", imgIndex: "1621905252507-b35492cc74b4" },
        { title: "Plumber", price: "₹200", imgIndex: "1585704032915-c3400ca199e7" },
        { title: "Carpenter", price: "₹300", imgIndex: "1617267156994-1a9478ca5148" },
        { title: "House Cleaning", price: "₹400", imgIndex: "1581578731117-10452b7d702e" },
    ];

    return (
        <>
            <ServiceSection title="Digital & Tech Services" services={digitalServices} sectionIndex={0} />
            <ServiceSection title="Wellness & Fitness" services={wellnessServices} sectionIndex={1} />
            <ServiceSection title="Home Services" services={homeServices} sectionIndex={2} />
        </>
    );
};

export default Services;
