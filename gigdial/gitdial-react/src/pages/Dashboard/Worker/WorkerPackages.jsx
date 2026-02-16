import React, { useState, useEffect } from 'react';
import { Check, Star, Shield, Zap, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

const WorkerPackages = () => {
    const [loading, setLoading] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const checkSubscription = async () => {
        try {
            const response = await fetch('/api/subscriptions/status', {
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setCurrentPlan(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        checkSubscription();
    }, []);

    const handlePurchase = async (plan) => {
        if (!window.confirm(`Are you sure you want to purchase the ${plan} package?`)) return;

        setLoading(true);
        try {
            const response = await fetch('/api/subscriptions/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo?.token}`
                },
                body: JSON.stringify({ plan })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} package activated successfully!`);
                checkSubscription();
                // Update local storage if needed, but usually we just re-fetch
            } else {
                toast.error(data.message || 'Purchase failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const packages = [
        {
            id: 'monthly',
            name: 'Monthly Pro',
            price: '₹499',
            period: '/month',
            features: [
                'Unlimited Profile Views',
                'See User Leads',
                'Priority Listing',
                'Verified Badge'
            ],
            recommended: false,
            color: 'blue'
        },
        {
            id: 'yearly',
            name: 'Yearly Elite',
            price: '₹4999',
            period: '/year',
            features: [
                'All Monthly Features',
                '2 Months Free',
                'Premium Support',
                'Gold Badge'
            ],
            recommended: true,
            color: 'purple'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Subscription Packages</h1>
                    <p className="text-slate-500">Upgrade your profile to get more leads and visibility</p>
                </div>
                {currentPlan?.isActive && (
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <Check size={18} />
                        <span className="font-medium">
                            Active Plan: {currentPlan.plan.toUpperCase()} (Expires: {new Date(currentPlan.endDate).toLocaleDateString()})
                        </span>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                {packages.map((pkg) => {
                    const isCurrent = currentPlan?.isActive && currentPlan.plan === pkg.id;

                    return (
                        <div
                            key={pkg.id}
                            className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${isCurrent ? 'border-green-500 ring-2 ring-green-100' :
                                pkg.recommended ? 'border-purple-500 shadow-md' : 'border-slate-200'
                                }`}
                        >
                            {pkg.recommended && !isCurrent && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full shadow-sm">
                                    Best Value
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                                <div className="flex items-end justify-center gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900">{pkg.price}</span>
                                    <span className="text-slate-500 mb-1">{pkg.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className={`p-1 rounded-full ${isCurrent ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            <Check size={14} />
                                        </div>
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handlePurchase(pkg.id)}
                                disabled={loading || isCurrent}
                                className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${isCurrent
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : pkg.recommended
                                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }`}
                            >
                                {loading ? 'Processing...' : isCurrent ? 'Active Plan' : 'Upgrade Now'}
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Instant Leads</h3>
                    <p className="text-slate-500 text-sm">See who visits your profile immediately and contact them.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Verified Badge</h3>
                    <p className="text-slate-500 text-sm">Stand out with a verified badge on your profile.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Premium Support</h3>
                    <p className="text-slate-500 text-sm">Get priority support for any issues or questions.</p>
                </div>
            </div>
        </div>
    );
};

export default WorkerPackages;
