import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldAlert, Zap } from 'lucide-react';

const LeadNotification = () => {
    const navigate = useNavigate();
    const [lastLeadCount, setLastLeadCount] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isWorker = userInfo?.isWorker;
    const pollIntervalRef = useRef(null);

    const checkLeads = async () => {
        if (!userInfo?.token || !isWorker) return;

        try {
            const response = await fetch('/api/leads/worker', {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                const currentLeads = data.leads || [];
                
                // If this is the first pull, just set the initial count
                if (lastLeadCount === null) {
                    setLastLeadCount(currentLeads.length);
                    return;
                }

                // If new leads detected
                if (currentLeads.length > lastLeadCount) {
                    const newLeadsCount = currentLeads.length - lastLeadCount;
                    const latestLead = currentLeads[0];
                    const isSubscribed = !data.subscriptionRequired;

                    // Custom Toast with Premium Look
                    toast.custom((t) => (
                        <div
                            className={`${
                                t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border-2 border-blue-100`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 pt-0.5">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSubscribed ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {isSubscribed ? <Bell size={20} /> : <ShieldAlert size={20} />}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm font-black text-slate-900 leading-none mb-1">
                                            {newLeadsCount > 1 ? `${newLeadsCount} New Leads Received!` : 'New Lead Received!'}
                                        </p>
                                        <p className="text-xs font-bold text-slate-500 leading-snug">
                                            {isSubscribed 
                                                ? `From ${latestLead.user?.name || latestLead.phoneNumber || 'Verified Customer'}`
                                                : 'Details are hidden. Buy 499 Plan to unlock now!'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col border-l border-slate-100">
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id);
                                        navigate(isSubscribed ? '/worker-dashboard/leads' : '/worker-dashboard/packages');
                                    }}
                                    className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-xs font-black text-blue-600 hover:text-blue-500 focus:outline-none bg-blue-50/50"
                                >
                                    {isSubscribed ? 'VIEW LEAD' : 'UPGRADE NOW'}
                                </button>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-slate-500 focus:outline-none"
                                >
                                    DISMISS
                                </button>
                            </div>
                        </div>
                    ), { duration: 6000, position: 'top-right' });

                    setLastLeadCount(currentLeads.length);
                }
            }
        } catch (error) {
            console.error('Error checking leads:', error);
        }
    };

    useEffect(() => {
        // Initial check
        checkLeads();

        // Start polling every 30 seconds
        pollIntervalRef.current = setInterval(checkLeads, 30000);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, []);

    return null; // This component doesn't render anything visible directly
};

export default LeadNotification;
