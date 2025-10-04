import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { Layout } from './components/Layout';
import { AuthModal } from './components/AuthModal';
import { SmartSuggestions } from './components/SmartSuggestions';
import { LiveFeed } from './components/LiveFeed';
import { CartView } from './components/CartView';
import { ProductCatalog } from './components/ProductCatalog';
import { SharedCartRoom } from './components/SharedCartRoom';
import { PaymentModal } from './components/PaymentModal';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { User, GreenImpact } from './types';

function App() {
  const { user, isLoading } = useAuth();
  const { items, addItem, updateQuantity, removeItem, clearCart, total } = useCart();
  const [showAuth, setShowAuth] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [roomId, setRoomId] = useState('');

  // Mock data for shared room
  const mockMembers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      verified: true,
      joinedAt: new Date()
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      verified: true,
      joinedAt: new Date()
    }
  ];

  const mockGreenImpact: GreenImpact = {
    co2Saved: 4.2,
    plasticSaved: 35,
    deliveriesMerged: 3,
    badges: ['Eco Shopper', 'Smart Saver']
  };

  const handleCreateRoom = () => {
    if (items.length === 0) {
      alert('Add some items to your cart before creating a room!');
      return;
    }
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(newRoomId);
    setShowRoom(true);
  };

  const handleCheckout = () => {
    if (!user) {
      if (window.confirm('Sign in to checkout and track your orders. Continue as guest?')) {
        // Allow guest checkout
        setShowPayment(true);
      } else {
        setShowAuth(true);
      }
      return;
    }
    if (items.length === 0) {
      alert('Your cart is empty. Add some items to proceed with checkout.');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    clearCart();
    alert('Payment successful! Your order has been placed.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading CartCast...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout cartItemCount={items.length}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Smart Suggestions */}
        <div className="lg:col-span-1">
          <SmartSuggestions onAddToCart={addItem} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <CartView
            items={items}
            total={total}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCreateRoom={handleCreateRoom}
            onCheckout={handleCheckout}
          />
          
          <ProductCatalog onAddToCart={addItem} />
        </div>

        {/* Right Sidebar - Live Feed */}
        <div className="lg:col-span-1">
          <LiveFeed />
        </div>
      </div>

      {/* Floating Sign In Button for non-authenticated users */}
      {!user && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <UserIcon className="w-5 h-5" />
            <span>Sign In / Sign Up</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      
      {showRoom && (
        <SharedCartRoom
          roomId={roomId}
          items={items}
          members={user ? [user, ...mockMembers] : mockMembers}
          greenImpact={mockGreenImpact}
          onClose={() => setShowRoom(false)}
        />
      )}
      
      <PaymentModal
        isOpen={showPayment}
        total={total}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
      />
    </Layout>
  );
}

export default App;