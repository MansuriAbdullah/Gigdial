import React from 'react';

const Stats = () => {
    const stats = [
        { label: 'Service Categories', value: '45+' },
        { label: 'Verified Workers', value: '10k+' },
        { label: 'Cities Covered', value: '12' },
        { label: 'Commission Fee', value: '0%' },
    ];

    return (
        <div className="relative -mt-16 z-20 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-lg border border-slate-200 shadow-lg p-6 rounded-2xl hover:bg-white hover:border-lime-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group">
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-lime-500 transition-all">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500 group-hover:text-slate-700">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
