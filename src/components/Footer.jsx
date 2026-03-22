import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">SaladBowl</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Fresh homemade salads prepared with love, delivered daily to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">Home</Link></li>
                            <li><Link to="/menu" className="text-gray-300 hover:text-primary transition-colors text-sm">Menu</Link></li>
                            <li><Link to="/cart" className="text-gray-300 hover:text-primary transition-colors text-sm">Cart</Link></li>
                            <li><Link to="/live-kitchen" className="text-gray-300 hover:text-primary transition-colors text-sm">Live Kitchen</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Contact Us</h3>
                        <ul className="space-y-2.5">
                            <li className="flex items-center gap-2 text-gray-300 text-sm">
                                <Phone className="w-4 h-4 text-primary" /> +91 98765 43210
                            </li>
                            <li className="flex items-center gap-2 text-gray-300 text-sm">
                                <Mail className="w-4 h-4 text-primary" /> hello@saladbowl.com
                            </li>
                            <li className="flex items-center gap-2 text-gray-300 text-sm">
                                <MapPin className="w-4 h-4 text-primary" /> Mumbai, India
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Follow Us</h3>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-xl flex items-center justify-center transition-all hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-xl flex items-center justify-center transition-all hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-xl flex items-center justify-center transition-all hover:scale-110">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-gray-500 text-sm">© 2024 SaladBowl. All rights reserved.</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Mom's Kitchen
                    </p>
                </div>
            </div>
        </footer>
    );
}
