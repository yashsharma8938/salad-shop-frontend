import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (salad) => {
        setItems(prev => {
            const existing = prev.find(item => item._id === salad._id);
            if (existing) {
                return prev.map(item =>
                    item._id === salad._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...salad, quantity: 1 }];
        });
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id, qty) => {
        if (qty <= 0) return removeItem(id);
        setItems(prev => prev.map(item =>
            item._id === id ? { ...item, quantity: qty } : item
        ));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}
