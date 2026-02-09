import React from 'react';
import { MapPin, Plus, Home, Briefcase, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const SavedAddresses = () => {
    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900">Saved Addresses</h1>
                    <p className="text-slate-500 mt-1">Manage your service locations</p>
                </div>
                <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    <span>Add New Address</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { id: 1, type: 'Home', icon: Home, address: 'Flat 402, Sunshine Apartments, MG Road, Bangalore - 560001', default: true },
                    { id: 2, type: 'Office', icon: Briefcase, address: 'Tech Park, Tower B, 5th Floor, Whitefield, Bangalore - 560066', default: false },
                    { id: 3, type: 'Parents Home', icon: Home, address: 'Villa 12, Palm Meadows, Marathahalli, Bangalore - 560037', default: false },
                ].map((addr) => (
                    <div key={addr.id} className={`p-8 rounded-[2.5rem] border transition-all duration-300 group ${addr.default
                            ? 'bg-blue-50/50 border-blue-200'
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50'
                        }`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${addr.default ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    <addr.icon size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-slate-900">{addr.type}</h3>
                                        {addr.default && <span className="px-2 py-0.5 bg-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">Default</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{addr.default ? 'Primary Location' : 'Secondary Location'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-slate-600 font-medium leading-relaxed">
                                {addr.address}
                            </p>
                        </div>

                        {!addr.default && (
                            <button className="mt-8 w-full py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedAddresses;
