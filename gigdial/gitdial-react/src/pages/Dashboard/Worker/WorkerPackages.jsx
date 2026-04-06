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

    const handleRefund = async () => {
        if (!window.confirm("Are you sure you want to request a refund? You will only be eligible if you haven't received any leads in the last 1 month. Your request will be sent to admin for approval.")) return;

        setLoading(true);
        try {
            const response = await fetch('/api/subscriptions/refund', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Refund request submitted to admin');
                checkSubscription();
            } else {
                toast.error(data.message || 'Refund request failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("Are you sure you want to cancel your active plan? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const response = await fetch('/api/subscriptions/cancel', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userInfo?.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Plan cancelled successfully');
                checkSubscription();
            } else {
                toast.error(data.message || 'Cancellation failed');
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
                'Verified Badge',
                'Refund if no leads in 1 month'
            ],
            recommended: true,
            color: 'blue'
        }
    ];

    return (
        <div className="space-y-6 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Subscription Packages</h1>
                    <p className="text-slate-500">Upgrade your profile to get more leads and visibility</p>
                </div>
                {currentPlan?.isActive && (
                    <div className="flex flex-col items-end gap-2">
                        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                            <Check size={18} />
                            <span className="font-medium">
                                Active Plan: {currentPlan.plan.toUpperCase()} (Expires: {new Date(currentPlan.endDate).toLocaleDateString()})
                            </span>
                        </div>

                        {currentPlan.refundStatus === 'none' ? (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleRefund}
                                    disabled={loading}
                                    className="text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
                                >
                                    Request Refund (Conditions apply)
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="text-xs font-bold text-slate-600 hover:text-slate-900 underline underline-offset-4"
                                >
                                    Cancel Plan
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end">
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${currentPlan.refundStatus === 'pending' ? 'bg-orange-100 text-orange-700' :
                                        currentPlan.refundStatus === 'processed' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    Refund {currentPlan.refundStatus === 'pending' ? 'in Progress' : currentPlan.refundStatus === 'processed' ? 'Successful' : 'Rejected'}
                                </span>
                                {currentPlan.refundStatus === 'pending' && (
                                    <p className="text-[10px] text-slate-400 mt-1 italic">Waiting for admin approval</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {!currentPlan?.isActive && currentPlan?.refundStatus === 'processed' && (
                    <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2">
                        <Check size={18} />
                        <span className="font-medium">Refund Successful - Subscription Ended</span>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto mt-8">
                {packages.map((pkg) => {
                    const isCurrent = currentPlan?.isActive && currentPlan.plan === pkg.id;

                    return (
                        <div
                            key={pkg.id}
                            className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${isCurrent ? 'border-green-500 ring-2 ring-green-100' :
                                pkg.recommended ? 'border-blue-500 shadow-md' : 'border-slate-200'
                                }`}
                        >
                            {pkg.recommended && !isCurrent && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full shadow-sm">
                                    Recommended
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
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }`}
                            >
                                {loading ? 'Processing...' : isCurrent ? 'Active Plan' : 'Upgrade Now'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Refund Policy Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mt-8">
                <div className="flex gap-3">
                    <Shield className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="font-bold text-blue-900 mb-1">Refund Policy</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                            Agar 1 mahenetak koi lead nahi aye to 499 refund milega. Request admin ke pass jayegi aur approve hone par refund successful hoga. <br />
                            <span className="font-semibold italic text-blue-900">Policy: If no leads are received within 1 month, you are eligible for a refund. Request goes to admin for approval.</span>
                        </p>
                    </div>
                </div>
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
                    <h3 className="font-bold text-slate-900 mb-2">Zero Lead Refund</h3>
                    <p className="text-slate-500 text-sm">Get money back if no leads received for a month (Admin approved).</p>
                </div>
            </div>
        </div>
    );
};

export default WorkerPackages;
