import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, ChefHat, DollarSign, Clock, Plus, Trash2, Edit, X, Eye, Video, Save, Loader2 } from 'lucide-react';
import API from '../utils/api';

const emptyForm = { name: '', description: '', price: '', ingredients: '', tags: [], stock: 20, isTrending: false, isAvailable: true, category: 'Salad' };
const tagOptions = ['Protein', 'Vegan', 'Low Calories', 'Gluten Free', 'Keto', 'High Fiber'];

export default function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState('orders');
    const [stats, setStats] = useState({ totalOrders: 0, todayOrders: 0, totalRevenue: 0, totalSalads: 0, pendingOrders: 0 });
    const [orders, setOrders] = useState([]);
    const [salads, setSalads] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [streamEnabled, setStreamEnabled] = useState(false);

    useEffect(() => {
        if (!user?.isAdmin) { navigate('/'); return; }
        fetchData();
    }, [user]);

    const fetchData = async () => {
        try {
            const [s, o, st, set] = await Promise.all([
                API.get('/salads'), API.get('/admin/orders'), API.get('/admin/stats'), API.get('/admin/settings')
            ]);
            setSalads(s.data); setOrders(o.data); setStats(st.data); setStreamEnabled(set.data.liveStreamEnabled);
        } catch (e) {
            // Fallback demo data
            setStats({ totalOrders: 24, todayOrders: 8, totalRevenue: 12400, totalSalads: 8, pendingOrders: 3 });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const data = { ...form, price: Number(form.price), stock: Number(form.stock), ingredients: typeof form.ingredients === 'string' ? form.ingredients.split(',').map(s => s.trim()) : form.ingredients };
            if (editId) { await API.put(`/admin/salads/${editId}`, data); }
            else { await API.post('/admin/salads', data); }
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchData();
        } catch (e) { alert('Error saving'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this salad?')) return;
        try { await API.delete(`/admin/salads/${id}`); fetchData(); } catch (e) { alert('Error'); }
    };

    const updateStatus = async (id, status) => {
        try { await API.put(`/admin/orders/${id}/status`, { status }); fetchData(); } catch (e) { alert('Error'); }
    };

    const toggleStream = async () => {
        try { await API.put('/admin/settings', { liveStreamEnabled: !streamEnabled }); setStreamEnabled(!streamEnabled); } catch (e) { setStreamEnabled(!streamEnabled); }
    };

    const statCards = [
        { label: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'bg-blue-500' },
        { label: 'Today', value: stats.todayOrders, icon: Clock, color: 'bg-green-500' },
        { label: 'Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: 'bg-orange-500' },
        { label: 'Pending', value: stats.pendingOrders, icon: ChefHat, color: 'bg-red-500' },
    ];

    const tabs = [
        { key: 'orders', label: 'Orders' },
        { key: 'menu', label: 'Menu' },
        { key: 'settings', label: 'Settings' },
    ];

    return (
        <div className="min-h-screen pt-20 pb-10 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-dark mb-6">Admin Dashboard</h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
                                    <s.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-dark">{s.value}</p>
                                    <p className="text-xs text-muted">{s.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-gray-100 w-fit">
                    {tabs.map(t => (
                        <button key={t.key} onClick={() => setTab(t.key)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.key ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow' : 'text-muted hover:text-dark'}`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Orders Tab */}
                {tab === 'orders' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-semibold text-muted">Order</th>
                                        <th className="text-left px-4 py-3 font-semibold text-muted">Customer</th>
                                        <th className="text-left px-4 py-3 font-semibold text-muted">Amount</th>
                                        <th className="text-left px-4 py-3 font-semibold text-muted">Status</th>
                                        <th className="text-left px-4 py-3 font-semibold text-muted">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center py-10 text-muted">No orders yet</td></tr>
                                    ) : orders.map(o => (
                                        <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="px-4 py-3 font-mono text-xs">#{o._id?.slice(-6)}</td>
                                            <td className="px-4 py-3">{o.user?.name || o.user?.email || 'N/A'}</td>
                                            <td className="px-4 py-3 font-semibold">₹{o.totalAmount}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                        o.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                                                            o.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-700'}`}>{o.status}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}
                                                    className="text-xs border rounded-lg px-2 py-1 outline-none focus:border-primary">
                                                    <option value="placed">Placed</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="out-for-delivery">Out for Delivery</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Menu Tab */}
                {tab === 'menu' && (
                    <div>
                        <button onClick={() => { setShowForm(true); setForm(emptyForm); setEditId(null); }}
                            className="mb-4 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                            <Plus className="w-4 h-4" /> Add Salad
                        </button>

                        {showForm && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-dark">{editId ? 'Edit' : 'Add'} Salad</h3>
                                    <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted" /></button>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm" />
                                    <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" type="number" className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm" />
                                    <input value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} placeholder="Ingredients (comma-separated)" className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm sm:col-span-2" />
                                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={2} className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm sm:col-span-2" />
                                    <div className="sm:col-span-2 flex flex-wrap gap-2">
                                        {tagOptions.map(t => (
                                            <button key={t} onClick={() => setForm({ ...form, tags: form.tags.includes(t) ? form.tags.filter(x => x !== t) : [...form.tags, t] })}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${form.tags.includes(t) ? 'bg-primary text-white' : 'bg-gray-100 text-muted'}`}>{t}</button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isTrending} onChange={e => setForm({ ...form, isTrending: e.target.checked })} className="accent-primary" /> Trending</label>
                                        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="accent-primary" /> Available</label>
                                    </div>
                                    <input value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="Stock" type="number" className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm" />
                                </div>
                                <button onClick={handleSave} disabled={loading} className="mt-4 px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl flex items-center gap-2 disabled:opacity-50 text-sm">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                                </button>
                            </div>
                        )}

                        <div className="grid gap-3">
                            {salads.map(s => (
                                <div key={s._id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100">
                                    <div>
                                        <h4 className="font-semibold text-dark text-sm">{s.name}</h4>
                                        <p className="text-xs text-muted">₹{s.price} · Stock: {s.stock} · {s.isAvailable ? '✅ Available' : '❌ Unavailable'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setForm({ ...s, ingredients: s.ingredients?.join(', ') }); setEditId(s._id); setShowForm(true); }} className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-muted" /></button>
                                        <button onClick={() => handleDelete(s._id)} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {tab === 'settings' && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-dark mb-4">Live Kitchen Stream</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Video className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="font-medium text-dark text-sm">Live Stream</p>
                                    <p className="text-xs text-muted">{streamEnabled ? 'Currently broadcasting' : 'Stream is off'}</p>
                                </div>
                            </div>
                            <button onClick={toggleStream}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${streamEnabled ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-primary-100 text-primary hover:bg-primary-200'}`}>
                                {streamEnabled ? 'Turn OFF' : 'Turn ON'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
