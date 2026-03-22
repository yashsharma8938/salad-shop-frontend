import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import SaladCard from '../components/SaladCard';
import API from '../utils/api';

const tags = ['All', 'Protein', 'Vegan', 'Low Calories', 'Keto', 'High Fiber', 'Gluten Free'];

const fallbackSalads = [
    { _id: '1', name: 'Classic Caesar Salad', description: 'Crisp romaine lettuce with creamy Caesar dressing, homemade croutons, and shaved parmesan.', price: 199, tags: ['Protein', 'Low Calories'], ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'], rating: 4.8, stock: 15, ordersToday: 12, isTrending: true },
    { _id: '2', name: 'Greek Garden Bowl', description: 'Fresh cucumbers, tomatoes, olives, red onion, and feta cheese with olive oil dressing.', price: 179, tags: ['Vegan', 'Low Calories'], ingredients: ['Cucumber', 'Tomato', 'Olives', 'Feta Cheese'], rating: 4.6, stock: 20, ordersToday: 8, isTrending: true },
    { _id: '3', name: 'Quinoa Power Bowl', description: 'Protein-packed quinoa with roasted chickpeas, avocado, cherry tomatoes, and tahini dressing.', price: 249, tags: ['Protein', 'Vegan', 'High Fiber'], ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Cherry Tomatoes'], rating: 4.9, stock: 12, ordersToday: 15, isTrending: true },
    { _id: '4', name: 'Asian Sesame Crunch', description: 'Crunchy cabbage, carrots, edamame, and crispy wonton strips with sesame ginger dressing.', price: 219, tags: ['Vegan', 'High Fiber'], ingredients: ['Cabbage', 'Carrots', 'Edamame', 'Sesame Seeds'], rating: 4.5, stock: 18, ordersToday: 6 },
    { _id: '5', name: 'Tropical Mango Delight', description: 'Fresh mango, strawberries, mixed greens, nuts, and honey lime dressing.', price: 229, tags: ['Vegan', 'Low Calories'], ingredients: ['Mango', 'Strawberries', 'Mixed Greens', 'Almonds'], rating: 4.7, stock: 10, ordersToday: 9, isTrending: true },
    { _id: '6', name: 'Mediterranean Feast', description: 'Hummus, falafel, tabbouleh, mixed greens, and tzatziki sauce in a hearty bowl.', price: 269, tags: ['Protein', 'High Fiber'], ingredients: ['Hummus', 'Falafel', 'Tabbouleh', 'Mixed Greens'], rating: 4.8, stock: 14, ordersToday: 11, isTrending: true },
    { _id: '7', name: 'Keto Green Machine', description: 'Avocado, bacon bits, boiled eggs, spinach, and ranch dressing — low carb perfection.', price: 259, tags: ['Protein', 'Keto'], ingredients: ['Avocado', 'Bacon', 'Boiled Eggs', 'Spinach'], rating: 4.4, stock: 8, ordersToday: 5 },
    { _id: '8', name: 'Berry Bliss Bowl', description: 'Mixed berries, granola, Greek yogurt, chia seeds, and a drizzle of honey.', price: 199, tags: ['Protein', 'Low Calories'], ingredients: ['Blueberries', 'Strawberries', 'Granola', 'Greek Yogurt'], rating: 4.6, stock: 16, ordersToday: 7 }
];

export default function Menu() {
    const [salads, setSalads] = useState([]);
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalads = async () => {
            try {
                const params = {};
                if (activeTag !== 'All') params.tag = activeTag;
                if (search) params.search = search;
                const res = await API.get('/salads', { params });
                setSalads(res.data);
            } catch {
                let filtered = fallbackSalads;
                if (activeTag !== 'All') filtered = filtered.filter(s => s.tags.includes(activeTag));
                if (search) filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
                setSalads(filtered);
            } finally {
                setLoading(false);
            }
        };
        fetchSalads();
    }, [activeTag, search]);

    return (
        <div className="min-h-screen pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl font-bold text-dark">Our Fresh Menu</h1>
                    <p className="text-muted mt-2">Handcrafted daily with the freshest ingredients</p>
                </div>

                {/* Search & Filters */}
                <div className="mb-8 space-y-4 animate-fade-in-up animation-delay-100">
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Search salads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border-2 border-gray-100 focus:border-primary outline-none shadow-sm text-dark"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg">
                                <X className="w-4 h-4 text-muted" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTag === tag
                                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20'
                                        : 'bg-white text-muted hover:text-dark hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Salad Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                <div className="h-48 skeleton" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 skeleton rounded w-3/4" />
                                    <div className="h-4 skeleton rounded" />
                                    <div className="h-4 skeleton rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : salads.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">🥗</p>
                        <h3 className="text-xl font-bold text-dark mb-2">No salads found</h3>
                        <p className="text-muted">Try a different search or filter</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {salads.map((salad, i) => (
                            <SaladCard key={salad._id} salad={salad} index={i} />
                        ))}
                    </div>
                )}

                {/* Pre-order banner */}
                <div className="mt-12 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 text-center border border-accent/20 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-dark mb-2">🌅 Pre-Order for Tomorrow!</h3>
                    <p className="text-muted text-sm">Get fresh salads prepared especially for you. Pre-order before 8 PM for next-day delivery.</p>
                </div>
            </div>
        </div>
    );
}
