import { useState } from 'react';
import { Video, X, Eye, Shield } from 'lucide-react';

export default function LiveKitchen() {
    const [showStream, setShowStream] = useState(false);

    return (
        <div className="min-h-screen pt-20 pb-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-600 text-sm font-semibold">Live Now</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-3">Watch Your Food Being Made</h1>
                    <p className="text-muted max-w-lg mx-auto">Full transparency. Watch our kitchen prepare your fresh salads in real-time.</p>
                </div>

                {!showStream ? (
                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center animate-fade-in-up animation-delay-100">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-3xl flex items-center justify-center">
                            <Video className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark mb-2">Live Kitchen Camera</h2>
                        <p className="text-muted mb-8 max-w-md mx-auto">See exactly how your salads are prepared — fresh ingredients, clean kitchen, made with love.</p>
                        <button
                            onClick={() => setShowStream(true)}
                            className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-red-500/30 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
                        >
                            <Eye className="w-5 h-5" /> Watch Live Kitchen
                        </button>

                        <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
                            {[
                                { icon: Shield, label: 'FSSAI Certified' },
                                { icon: Eye, label: 'Full Transparency' },
                                { icon: Video, label: 'Live 24/7' }
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <item.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                                    <p className="text-xs font-medium text-muted">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fade-in-up">
                        <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setShowStream(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-red-500 rounded-full">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span className="text-white text-xs font-bold">LIVE</span>
                            </div>
                            <div className="aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                                    title="Live Kitchen Camera"
                                    className="w-full h-full"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted mt-4">🔴 Live from Mom's Kitchen — Preparing fresh salads right now!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
