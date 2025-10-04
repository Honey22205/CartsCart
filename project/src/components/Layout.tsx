import React from 'react';
import { ShoppingCart, User, LogOut, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  cartItemCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartItemCount }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">Walmart</span>
                  <span className="text-xl font-bold text-blue-600 ml-1">CartCast</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Cart Icon */}
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </div>
              
              {/* User Info */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg px-3 py-2 border border-blue-200">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </div>
                    {!user.verified && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-yellow-600 font-medium">Verifying...</span>
                      </div>
                    )}
                    {user.verified && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg">
                  <span className="font-medium">Guest Mode:</span> You can shop and create rooms without signing in!
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};