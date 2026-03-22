import { Star } from 'lucide-react';

const testimonials = [
    { name: 'Priya S.', rating: 5, comment: 'Absolutely love the freshness! You can taste the difference from store-bought.', avatar: 'P' },
    { name: 'Rahul M.', rating: 5, comment: 'Best salads in town! My kids actually enjoy eating healthy now.', avatar: 'R' },
    { name: 'Anita K.', rating: 4, comment: 'Great portions and fresh ingredients. The quinoa bowl is my favorite!', avatar: 'A' },
    { name: 'Sneha D.', rating: 5, comment: 'So happy I found this! Homemade quality with delivery convenience.', avatar: 'S' },
    { name: 'Vikram P.', rating: 4, comment: 'Love the transparency of the live kitchen! Really builds trust.', avatar: 'V' },
    { name: 'Meera R.', rating: 5, comment: 'My go-to for daily healthy lunch. The Caesar salad is chef-level!', avatar: 'M' },
];

export default function ReviewSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-dark mt-2">What Our Customers Say</h2>
                    <p className="text-muted mt-3 max-w-lg mx-auto">Real reviews from real salad lovers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((review, i) => (
                        <div
                            key={i}
                            className="bg-primary-50/50 rounded-2xl p-6 card-hover border border-primary-100/50 animate-fade-in-up"
                            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                        >
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, j) => (
                                    <Star
                                        key={j}
                                        className={`w-4 h-4 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-dark text-sm leading-relaxed mb-4">"{review.comment}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{review.avatar}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-dark text-sm">{review.name}</p>
                                    <p className="text-muted text-xs">Verified Customer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
