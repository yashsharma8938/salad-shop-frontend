import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, ChefHat, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ChefHat className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">SaladBowl</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-dark font-medium hover:text-primary transition-colors">Home</Link>
                        <Link to="/menu" className="text-dark font-medium hover:text-primary transition-colors">Menu</Link>
                        <Link to="/live-kitchen" className="flex items-center gap-1.5 text-dark font-medium hover:text-primary transition-colors">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Live Kitchen
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-primary-100 transition-colors group">
                            <ShoppingCart className="w-5 h-5 text-dark group-hover:text-primary transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce-gentle">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-100 transition-colors">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{user.name?.[0] || user.email[0].toUpperCase()}</span>
                                    </div>
                                </button>
                                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-50">
                                        <p className="text-sm font-semibold text-dark truncate">{user.name || 'User'}</p>
                                        <p className="text-xs text-muted truncate">{user.email}</p>
                                    </div>
                                    <Link to="/orders" className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark hover:bg-primary-50 transition-colors">
                                        <ShoppingCart className="w-4 h-4" /> My Orders
                                    </Link>
                                    {user.isAdmin && (
                                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-dark hover:bg-primary-50 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                    )}
                                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 text-sm">
                                Login
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-xl hover:bg-primary-100 transition-colors">
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down">
                    <div className="px-4 py-3 space-y-1">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-dark font-medium hover:bg-primary-50">Home</Link>
                        <Link to="/menu" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-dark font-medium hover:bg-primary-50">Menu</Link>
                        <Link to="/live-kitchen" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-dark font-medium hover:bg-primary-50">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Kitchen
                        </Link>
                        <Link to="/orders" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-dark font-medium hover:bg-primary-50">My Orders</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
