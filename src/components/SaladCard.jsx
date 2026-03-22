import { ShoppingCart, Plus, Star, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

const tagColors = {
    'Protein': 'bg-blue-100 text-blue-700',
    'Vegan': 'bg-green-100 text-green-700',
    'Low Calories': 'bg-yellow-100 text-yellow-700',
    'Gluten Free': 'bg-purple-100 text-purple-700',
    'Keto': 'bg-orange-100 text-orange-700',
    'High Fiber': 'bg-teal-100 text-teal-700'
};

const saladImages = {
    'Classic Caesar Salad': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop',
    'Greek Garden Bowl': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    'Quinoa Power Bowl': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'Asian Sesame Crunch': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&h=300&fit=crop',
    'Tropical Mango Delight': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
    'Mediterranean Feast': 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=400&h=300&fit=crop',
    'Keto Green Machine': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'Berry Bliss Bowl': 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
};

export default function SaladCard({ salad, index = 0 }) {
    const { addItem, items } = useCart();
    const inCart = items.find(item => item._id === salad._id);
    const imageUrl = saladImages[salad.name] || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';

    return (
        <div
            className="bg-white rounded-2xl overflow-hidden card-hover shadow-sm border border-gray-100 animate-fade-in-up group"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={imageUrl}
                    alt={salad.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Trending badge */}
                {salad.isTrending && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                        <Flame className="w-3 h-3" /> Trending
                    </div>
                )}

                {/* Stock alert */}
                {salad.stock <= 5 && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full shadow-lg">
                        Only {salad.stock} left!
                    </div>
                )}

                {/* Price badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
                    <span className="text-lg font-bold text-primary-dark">₹{salad.price}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-dark text-base leading-tight">{salad.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-dark">{salad.rating}</span>
                    </div>
                </div>

                <p className="text-muted text-sm mb-3 line-clamp-2">{salad.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {salad.tags?.map(tag => (
                        <span key={tag} className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Ingredients preview */}
                <p className="text-xs text-muted mb-4 truncate">
                    {salad.ingredients?.slice(0, 4).join(' • ')}{salad.ingredients?.length > 4 ? ' ...' : ''}
                </p>

                {/* Social proof + Add to cart */}
                <div className="flex items-center justify-between">
                    {salad.ordersToday > 0 && (
                        <span className="text-xs text-accent font-medium">🔥 {salad.ordersToday} ordered today</span>
                    )}
                    <button
                        onClick={() => addItem(salad)}
                        className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${inCart
                                ? 'bg-primary-100 text-primary-dark'
                                : 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30'
                            }`}
                    >
                        {inCart ? (
                            <>
                                <ShoppingCart className="w-4 h-4" /> In Cart ({inCart.quantity})
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" /> Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
