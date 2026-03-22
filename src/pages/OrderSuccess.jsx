import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';

export default function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center animate-fade-in-up">
                <div className="w-28 h-28 mx-auto bg-primary-100 rounded-full flex items-center justify-center animate-pulse-green mb-8">
                    <CheckCircle className="w-16 h-16 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-dark mb-3">Order Placed! 🎉</h1>
                <p className="text-muted mb-2">Your fresh salads are being prepared with love</p>

                {order && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <Package className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-dark">Order Details</h3>
                        </div>
                        <div className="space-y-2 mb-4">
                            {order.items?.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-3 flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-primary-dark">₹{order.totalAmount}</span>
                        </div>
                    </div>
                )}

                <div className="mt-8 space-y-3">
                    <Link to="/order-tracking" state={{ order }} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        Track Order <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/menu" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-dark font-semibold rounded-xl border-2 border-gray-200 hover:border-primary transition-all">
                        Order More
                    </Link>
                </div>
            </div>
        </div>
    );
}
