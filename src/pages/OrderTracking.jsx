import { useLocation } from 'react-router-dom';
import { Package, ChefHat, Truck, CheckCircle } from 'lucide-react';

const steps = [
    { key: 'placed', label: 'Order Placed', icon: Package, desc: 'We received your order' },
    { key: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Your salad is being made fresh' },
    { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, desc: 'On the way to you' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, desc: 'Enjoy your meal!' }
];

export default function OrderTracking() {
    const location = useLocation();
    const order = location.state?.order;
    const currentStatus = order?.status || 'placed';
    const currentIdx = steps.findIndex(s => s.key === currentStatus);

    return (
        <div className="min-h-screen pt-20 pb-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-8 animate-fade-in-up">Order Tracking</h1>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-fade-in-up">
                    <div className="space-y-0">
                        {steps.map((step, i) => {
                            const isComplete = i <= currentIdx;
                            const isCurrent = i === currentIdx;
                            return (
                                <div key={step.key} className="flex gap-4 relative">
                                    {i < steps.length - 1 && (
                                        <div className={`absolute left-5 top-10 w-0.5 h-full ${isComplete ? 'bg-primary' : 'bg-gray-200'}`} />
                                    )}
                                    <div className={`relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${isCurrent ? 'bg-primary text-white animate-pulse-green' : isComplete ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <div className="pb-8">
                                        <h3 className={`font-semibold ${isComplete ? 'text-dark' : 'text-gray-400'}`}>{step.label}</h3>
                                        <p className={`text-sm ${isComplete ? 'text-muted' : 'text-gray-300'}`}>{step.desc}</p>
                                        {isCurrent && <span className="inline-block mt-1 text-xs font-medium text-primary bg-primary-100 px-2 py-0.5 rounded-full">Current</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
