import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  total,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        onSuccess();
        onClose();
        setPaymentSuccess(false);
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">
              Your order has been processed successfully.
              {!user && " Order confirmation will be sent to your email."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            {!user && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Information</span>
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address (for order confirmation)"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || (!user && (!guestName.trim() || !guestEmail.trim()))}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ${total.toFixed(2)}</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                For demonstration purposes only. No actual payment will be processed.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};