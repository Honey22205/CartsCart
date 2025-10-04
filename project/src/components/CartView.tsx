import React from 'react';
import { Plus, Minus, Trash2, Share2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCreateRoom: () => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCreateRoom,
  onCheckout
}) => {
  const handleCreateRoom = () => {
    if (items.length === 0) {
      alert('Add some items to your cart before creating a room!');
      return;
    }
    onCreateRoom();
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 3.6M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
        <button
          onClick={handleCreateRoom}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0}
          title={items.length === 0 ? "Add items to your cart first" : "Create a shareable room for group shopping"}
        >
          <Share2 className="w-4 h-4" />
          <span>Create Room</span>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.product.name}</h3>
              <p className="text-sm text-gray-600">${item.product.price}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => onRemoveItem(item.product.id)}
                className="mt-2 p-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CreditCard className="w-5 h-5" />
          <span>Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
};