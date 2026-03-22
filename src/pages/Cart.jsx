import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const saladImages = {
    'Classic Caesar Salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=120&h=120&fit=crop',
    'Greek Garden Bowl': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&h=120&fit=crop',
    'Quinoa Power Bowl': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop',
    'Asian Sesame Crunch': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=120&h=120&fit=crop',
    'Tropical Mango Delight': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=120&h=120&fit=crop',
    'Mediterranean Feast': 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=120&h=120&fit=crop',
    'Keto Green Machine': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop',
    'Berry Bliss Bowl': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=120&h=120&fit=crop'
};

export default function Cart() {
    const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center animate-fade-in-up">
                    <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
                    <p className="text-muted mb-6">Add some delicious salads to get started!</p>
                    <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        Browse Menu <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark">Your Cart</h1>
                        <p className="text-muted text-sm mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors">
                        Clear All
                    </button>
                </div>

                {/* Cart Items */}
                <div className="space-y-3 mb-6">
                    {items.map((item, i) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 card-hover animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                        >
                            <img
                                src={saladImages[item.name] || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop'}
                                alt={item.name}
                                className="w-20 h-20 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-dark text-sm truncate">{item.name}</h3>
                                <p className="text-primary-dark font-bold mt-1">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-primary-100 text-dark hover:text-primary transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-bold text-dark">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-primary-100 text-dark hover:text-primary transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="font-bold text-dark">₹{item.price * item.quantity}</p>
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-400 hover:text-red-500 transition-colors mt-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in-up animation-delay-200">
                    <h3 className="font-bold text-dark mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Subtotal</span>
                            <span className="text-dark font-medium">₹{totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Delivery Fee</span>
                            <span className="text-primary font-medium">FREE</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                        <span className="font-bold text-dark text-lg">Total</span>
                        <span className="font-bold text-primary-dark text-xl">₹{totalPrice}</span>
                    </div>

                    <Link
                        to="/checkout"
                        className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] text-base"
                    >
                        Proceed to Checkout <ArrowRight className="w-5 h-5" />
                    </Link>

                    <Link
                        to="/menu"
                        className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-muted hover:text-primary transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
