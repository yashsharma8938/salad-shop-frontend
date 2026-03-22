import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Leaf, ShieldCheck, Heart, Eye, Sparkles, ChevronRight, Timer } from 'lucide-react';
import SaladCard from '../components/SaladCard';
import ReviewSection from '../components/ReviewSection';
import API from '../utils/api';

const trustFeatures = [
    { icon: Heart, title: 'Homemade with Love', desc: 'Every salad prepared by caring hands in our home kitchen', color: 'from-pink-500 to-rose-500' },
    { icon: Leaf, title: 'Fresh Ingredients', desc: '100% fresh vegetables and fruits sourced daily', color: 'from-green-500 to-emerald-500' },
    { icon: ShieldCheck, title: 'Hygienic Kitchen', desc: 'Strict hygiene standards maintained at all times', color: 'from-blue-500 to-indigo-500' },
    { icon: Eye, title: 'Live Kitchen', desc: 'Watch your food being prepared in real-time', color: 'from-purple-500 to-violet-500' },
];

export default function Home() {
    const [salads, setSalads] = useState([]);
    const [trending, setTrending] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allRes, trendRes] = await Promise.all([
                    API.get('/salads'),
                    API.get('/salads/trending')
                ]);
                setSalads(allRes.data);
                setTrending(trendRes.data);
            } catch (err) {
                // Use fallback data if API not available
                const fallback = [
                    { _id: '1', name: 'Classic Caesar Salad', description: 'Crisp romaine lettuce with creamy Caesar dressing, homemade croutons, and shaved parmesan.', price: 199, tags: ['Protein', 'Low Calories'], ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'], rating: 4.8, stock: 15, ordersToday: 12, isTrending: true, isAvailable: true },
                    { _id: '2', name: 'Greek Garden Bowl', description: 'Fresh cucumbers, tomatoes, olives, red onion, and feta cheese with olive oil dressing.', price: 179, tags: ['Vegan', 'Low Calories'], ingredients: ['Cucumber', 'Tomato', 'Olives', 'Feta Cheese'], rating: 4.6, stock: 20, ordersToday: 8, isTrending: true, isAvailable: true },
                    { _id: '3', name: 'Quinoa Power Bowl', description: 'Protein-packed quinoa with roasted chickpeas, avocado, cherry tomatoes, and tahini dressing.', price: 249, tags: ['Protein', 'Vegan', 'High Fiber'], ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Cherry Tomatoes'], rating: 4.9, stock: 12, ordersToday: 15, isTrending: true, isAvailable: true },
                    { _id: '4', name: 'Asian Sesame Crunch', description: 'Crunchy cabbage, carrots, edamame, and crispy wonton strips with sesame ginger dressing.', price: 219, tags: ['Vegan', 'High Fiber'], ingredients: ['Cabbage', 'Carrots', 'Edamame', 'Sesame Seeds'], rating: 4.5, stock: 18, ordersToday: 6, isTrending: false, isAvailable: true },
                    { _id: '5', name: 'Tropical Mango Delight', description: 'Fresh mango, strawberries, mixed greens, nuts, and honey lime dressing.', price: 229, tags: ['Vegan', 'Low Calories'], ingredients: ['Mango', 'Strawberries', 'Mixed Greens', 'Almonds'], rating: 4.7, stock: 10, ordersToday: 9, isTrending: true, isAvailable: true },
                    { _id: '6', name: 'Mediterranean Feast', description: 'Hummus, falafel, tabbouleh, mixed greens, and tzatziki sauce in a hearty bowl.', price: 269, tags: ['Protein', 'High Fiber'], ingredients: ['Hummus', 'Falafel', 'Tabbouleh', 'Mixed Greens'], rating: 4.8, stock: 14, ordersToday: 11, isTrending: true, isAvailable: true },
                    { _id: '7', name: 'Keto Green Machine', description: 'Avocado, bacon bits, boiled eggs, spinach, and ranch dressing — low carb perfection.', price: 259, tags: ['Protein', 'Keto'], ingredients: ['Avocado', 'Bacon', 'Boiled Eggs', 'Spinach'], rating: 4.4, stock: 8, ordersToday: 5, isTrending: false, isAvailable: true },
                    { _id: '8', name: 'Berry Bliss Bowl', description: 'Mixed berries, granola, Greek yogurt, chia seeds, and a drizzle of honey.', price: 199, tags: ['Protein', 'Low Calories'], ingredients: ['Blueberries', 'Strawberries', 'Granola', 'Greek Yogurt'], rating: 4.6, stock: 16, ordersToday: 7, isTrending: false, isAvailable: true }
                ];
                setSalads(fallback);
                setTrending(fallback.filter(s => s.isTrending));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredSalads = search
        ? salads.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-green-50" />
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-primary-dark text-sm font-semibold">Fresh & Healthy Daily</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-6">
                                Fresh Homemade <br />
                                <span className="gradient-text">Salads Delivered</span> <br />
                                Daily
                            </h1>

                            <p className="text-lg text-muted max-w-lg mb-8 leading-relaxed">
                                Made with love by Mom's Kitchen. Fresh ingredients, hygienic preparation,
                                and delivered straight to your doorstep. Taste the homemade difference!
                            </p>

                            {/* Search Bar */}
                            <div className="relative max-w-md mb-8 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search for salads..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-0 outline-none shadow-lg shadow-gray-100/50 text-dark placeholder:text-gray-400 transition-all"
                                />
                                {search && filteredSalads.length > 0 && (
                                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 max-h-64 overflow-y-auto">
                                        {filteredSalads.map(s => (
                                            <Link
                                                key={s._id}
                                                to="/menu"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors"
                                                onClick={() => setSearch('')}
                                            >
                                                <span className="text-2xl">🥗</span>
                                                <div>
                                                    <p className="font-medium text-dark text-sm">{s.name}</p>
                                                    <p className="text-xs text-muted">₹{s.price}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/menu"
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 flex items-center gap-2 text-base"
                                >
                                    Order Now <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/live-kitchen"
                                    className="px-8 py-4 bg-white text-dark font-bold rounded-2xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all flex items-center gap-2 text-base"
                                >
                                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" /> Watch Live Kitchen
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-8 mt-10">
                                <div>
                                    <p className="text-2xl font-bold text-dark">500+</p>
                                    <p className="text-sm text-muted">Happy Customers</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark">4.8★</p>
                                    <p className="text-sm text-muted">Average Rating</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark">30min</p>
                                    <p className="text-sm text-muted">Avg Delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Hero Image */}
                        <div className="hidden lg:block animate-slide-right">
                            <div className="relative">
                                <div className="w-[480px] h-[480px] mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop"
                                        alt="Fresh Healthy Salad Bowl"
                                        className="w-[420px] h-[420px] object-cover rounded-full animate-float"
                                    />
                                </div>
                                {/* Floating badges */}
                                <div className="absolute top-10 left-0 px-4 py-2 bg-white rounded-xl shadow-lg animate-bounce-gentle flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-sm text-dark">100% Fresh</span>
                                </div>
                                <div className="absolute bottom-20 right-0 px-4 py-2 bg-white rounded-xl shadow-lg animate-bounce-gentle animation-delay-300 flex items-center gap-2">
                                    <Timer className="w-5 h-5 text-accent" />
                                    <span className="font-semibold text-sm text-dark">30 min delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Healthy Tip */}
            <section className="py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 flex items-center justify-center gap-3 text-white">
                        <Sparkles className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium text-center">💡 Healthy Tip: Eating salads daily can boost your immunity by 40% and improve digestion!</p>
                    </div>
                </div>
            </section>

            {/* Trending Salads */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Popular</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-1">🔥 Trending Today</h2>
                        </div>
                        <Link to="/menu" className="flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all text-sm">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                    <div className="h-48 skeleton" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-5 skeleton rounded w-3/4" />
                                        <div className="h-4 skeleton rounded w-full" />
                                        <div className="h-4 skeleton rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trending.map((salad, i) => (
                                <SaladCard key={salad._id} salad={salad} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Healthy Picks */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Curated</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-1">🥗 Healthy Picks Today</h2>
                        </div>
                        <Link to="/menu" className="flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all text-sm">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {salads.filter(s => s.tags?.includes('Low Calories') || s.tags?.includes('Vegan')).slice(0, 4).map((salad, i) => (
                            <SaladCard key={salad._id} salad={salad} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">Prepared with Care & Transparency</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trustFeatures.map((feature, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 text-center card-hover shadow-sm border border-gray-100 animate-fade-in-up"
                                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                            >
                                <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-dark mb-2">{feature.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews */}
            <ReviewSection />

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200')] bg-cover bg-center opacity-10" />
                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Eat Healthy?</h2>
                            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                                Order your favorite salads now and get them delivered fresh within 30 minutes!
                            </p>
                            <Link
                                to="/menu"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark font-bold rounded-2xl hover:shadow-xl transition-all hover:scale-105 text-base"
                            >
                                Browse Menu <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
