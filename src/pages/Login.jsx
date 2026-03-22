import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, ChefHat, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

export default function Login() {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true); setError('');
        try {
            await API.post('/auth/send-otp', { email });
            setStep('otp');
        } catch (err) {
            // Demo mode fallback
            setStep('otp');
        } finally { setLoading(false); }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) return;
        setLoading(true); setError('');
        try {
            const res = await API.post('/auth/verify-otp', { email, otp });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            if (otp === '123456') {
                // Demo fallback
                const demoUser = { _id: 'demo', name: 'Demo User', email, isAdmin: email.includes('admin') };
                login('demo_token_' + Date.now(), demoUser);
                navigate('/');
            } else {
                setError('Invalid OTP. Use 123456 for demo.');
            }
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen pt-16 flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-white to-green-50">
            <div className="max-w-md w-full animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-4">
                        <ChefHat className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-dark">Welcome to SaladBowl</h1>
                    <p className="text-muted text-sm mt-1">Sign in to order fresh salads</p>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                    {step === 'email' ? (
                        <form onSubmit={handleSendOtp}>
                            <label className="text-sm font-medium text-dark mb-2 block">Email Address</label>
                            <div className="relative mb-4">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark"
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Send OTP</span> <ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp}>
                            <p className="text-sm text-muted mb-4">OTP sent to <span className="font-semibold text-dark">{email}</span></p>
                            <label className="text-sm font-medium text-dark mb-2 block">Enter OTP</label>
                            <div className="relative mb-4">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text" value={otp} onChange={e => setOtp(e.target.value)}
                                    placeholder="123456" maxLength={6}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary outline-none text-dark text-center text-xl tracking-[0.5em] font-mono"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                            <button type="submit" disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
                            </button>
                            <button type="button" onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                                className="w-full mt-3 text-sm text-muted hover:text-primary transition-colors">
                                Change email
                            </button>
                        </form>
                    )}

                    <div className="mt-4 p-3 bg-primary-50 rounded-xl">
                        <p className="text-xs text-primary-dark text-center">💡 Demo: Use any email & OTP <strong>123456</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
