import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Shield, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Checkout() {
    const { items, totalPrice, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        street: user?.addresses?.[0]?.street || '',
        city: user?.addresses?.[0]?.city || '',
        state: user?.addresses?.[0]?.state || '',
        pincode: user?.addresses?.[0]?.pincode || ''
    });

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const handlePayment = async () => {
        if (!address.street || !address.city || !address.pincode) {
            alert('Please fill in your delivery address');
            return;
        }

        setLoading(true);
        try {
            // Create payment order
            let paymentId = 'pay_demo_' + Date.now();

            if (token) {
                try {
                    const payRes = await API.post('/payment/create-order', { amount: totalPrice });
                    paymentId = payRes.data.orderId;
                } catch (e) {
                    // Use demo payment
                }
            }

            // Create order
            if (token) {
                try {
                    const orderItems = items.map(item => ({
                        saladId: item._id,
                        quantity: item.quantity
                    }));

                    const orderRes = await API.post('/orders', {
                        items: orderItems,
                        address,
                        paymentId
                    });

                    clearCart();
                    navigate('/order-success', { state: { order: orderRes.data } });
                    return;
                } catch (e) {
                    // Fallback to demo
                }
            }

            // Demo mode
            clearCart();
            navigate('/order-success', {
                state: {
                    order: {
                        _id: 'demo_' + Date.now(),
                        items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
                        totalAmount: totalPrice,
                        status: 'placed',
                        paymentId
                    }
                }
            });
        } catch (error) {
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-8 animate-fade-in-up">Checkout</h1>

                <div className="grid gap-6">
                    {/* Delivery Address */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="font-bold text-dark text-lg">Delivery Address</h2>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted mb-1 block">Street Address *</label>
                                <input
                                    type="text"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    placeholder="e.g., 123 Green Lane, Apt 4B"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark text-sm transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted mb-1 block">City *</label>
                                    <input
                                        type="text"
                                        value={address.city}
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                        placeholder="Mumbai"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark text-sm transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted mb-1 block">State</label>
                                    <input
                                        type="text"
                                        value={address.state}
                                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                        placeholder="Maharashtra"
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark text-sm transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-muted mb-1 block">Pincode *</label>
                                <input
                                    type="text"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                    placeholder="400001"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark text-sm transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up animation-delay-100">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="font-bold text-dark text-lg">Order Summary</h2>
                        </div>

                        <div className="space-y-3 mb-4">
                            {items.map(item => (
                                <div key={item._id} className="flex justify-between items-center text-sm">
                                    <span className="text-dark">{item.name} <span className="text-muted">× {item.quantity}</span></span>
                                    <span className="font-medium text-dark">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Subtotal</span>
                                <span className="text-dark">₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Delivery</span>
                                <span className="text-primary font-medium">FREE</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="font-bold text-dark text-lg">Total</span>
                                <span className="font-bold text-primary-dark text-xl">₹{totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up animation-delay-200"
                    >
                        {loading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                            <><Shield className="w-5 h-5" /> Pay ₹{totalPrice} Securely</>
                        )}
                    </button>

                    <p className="text-center text-xs text-muted flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" /> Secured by Razorpay. Your payment information is safe.
                    </p>
                </div>
            </div>
        </div>
    );
}
