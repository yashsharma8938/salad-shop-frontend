import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = '919876543210'; // Replace with actual number
    const message = encodeURIComponent('Hi! I want to order fresh salads 🥗');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110 animate-pulse-green group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-dark text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Chat with us!
            </span>
        </a>
    );
}
