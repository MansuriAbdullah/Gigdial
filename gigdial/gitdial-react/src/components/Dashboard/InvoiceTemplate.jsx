import React from 'react';

const InvoiceTemplate = ({ order, invoiceRef }) => {
    if (!order) return null;

    return (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <div ref={invoiceRef} className="bg-white p-12 w-[800px] text-slate-900 font-sans" id="invoice-content">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
                            <h1 className="text-2xl font-bold text-slate-900">GigDial</h1>
                        </div>
                        <p className="text-slate-500 text-sm">Empowering Professionals</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-bold text-slate-200 uppercase tracking-widest mb-2">Invoice</h2>
                        <p className="font-bold text-slate-900">#INV-{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-slate-500 text-sm">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Billed To / From */}
                <div className="flex justify-between mb-16">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Billed To</p>
                        <h3 className="font-bold text-lg mb-1">Customer</h3>
                        <p className="text-slate-600 text-sm">ID: {order.user?._id || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Service Provider</p>
                        <h3 className="font-bold text-lg mb-1">{order.workerName}</h3>
                        <p className="text-slate-600 text-sm">{order.serviceName}</p>
                    </div>
                </div>

                {/* Table */}
                <div className="mb-8">
                    <div className="bg-slate-50 rounded-t-xl p-4 flex text-xs font-bold text-slate-500 uppercase">
                        <div className="flex-1">Description</div>
                        <div className="w-32 text-right">Price</div>
                    </div>
                    <div className="p-4 border-b border-slate-100 flex items-center">
                        <div className="flex-1">
                            <p className="font-bold text-slate-900">{order.serviceName}</p>
                            <p className="text-sm text-slate-500">Service completed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="w-32 text-right font-bold text-slate-900">₹{order.amount}</div>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-end mb-16">
                    <div className="w-64">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-bold text-slate-900">₹{order.amount}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-500">Tax (0%)</span>
                            <span className="font-bold text-slate-900">₹0</span>
                        </div>
                        <div className="flex justify-between py-4">
                            <span className="text-slate-900 font-bold text-lg">Total</span>
                            <span className="text-blue-600 font-bold text-2xl">₹{order.amount}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-8 text-center">
                    <p className="text-slate-500 text-sm mb-2">Thank you for choosing GigDial!</p>
                    <p className="text-slate-400 text-xs">This is a widely generated computer invoice.</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTemplate;
