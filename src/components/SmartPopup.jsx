import { useState, useEffect } from 'react';
import { X, Leaf } from 'lucide-react';

const defaultMessages = [
    '🥗 Time to recharge with something healthy!',
    '🥗 Your body deserves fresh salads today!',
    '🥗 Fresh salads prepared today – order before they sell out!',
    '🥗 Healthy food time! Dive into fresh bowls.',
    '🥗 Only a few bowls left today! Order now!',
    '🥗 3 people ordered this in the last 10 minutes!'
];

export default function SmartPopup() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        const showPopup = () => {
            const msg = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
            setMessage(msg);
            setVisible(true);
            setTimeout(() => setVisible(false), 5000);
        };

        // Show first popup after 15 seconds
        const firstTimeout = setTimeout(showPopup, 15000);

        // Then every 45 seconds
        const interval = setInterval(showPopup, 45000);

        return () => {
            clearTimeout(firstTimeout);
            clearInterval(interval);
        };
    }, [dismissed]);

    if (!visible || dismissed) return null;

    return (
        <div className="fixed bottom-24 right-4 z-40 max-w-sm animate-slide-right">
            <div className="bg-white rounded-2xl shadow-2xl border border-primary-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-white" />
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">Fresh Alert</span>
                    </div>
                    <button
                        onClick={() => { setVisible(false); setDismissed(true); }}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-dark font-medium text-sm leading-relaxed">{message}</p>
                </div>
            </div>
        </div>
    );
}
