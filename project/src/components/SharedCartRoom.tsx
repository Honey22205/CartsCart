import React, { useState, useEffect } from 'react';
import { Users, Copy, Check, Share2, Award, Leaf, X, Send, UserPlus, ExternalLink, Mail } from 'lucide-react';
import { CartItem, User, GreenImpact } from '../types';

interface SharedCartRoomProps {
  roomId: string;
  items: CartItem[];
  members: User[];
  greenImpact: GreenImpact;
  onClose: () => void;
}

export const SharedCartRoom: React.FC<SharedCartRoomProps> = ({
  roomId,
  items,
  members,
  greenImpact,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showGuestForm, setShowGuestForm] = useState(false);

  useEffect(() => {
    const url = `${window.location.origin}/room/${roomId}`;
    setShareUrl(url);
    setRoomName(`Shopping Room ${roomId.slice(0, 4).toUpperCase()}`);
  }, [roomId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInviteByEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      // Simulate sending invite
      setInviteSent(true);
      setInviteEmail('');
      setTimeout(() => {
        setInviteSent(false);
        setShowInviteForm(false);
      }, 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `🛒 Join my shopping cart on Walmart CartCast!\n\nRoom: ${roomName}\nRoom ID: ${roomId}\nLink: ${shareUrl}\n\n✨ Benefits:\n• Group discounts up to 10%\n• Free delivery on group orders\n• Eco-friendly shopping\n• Discover new products together\n\nLet's shop smart and save money! 💰🌱`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Join my Walmart CartCast shopping room: ${roomName}`;
    const body = `Hi!\n\nI've created a shared shopping cart on Walmart CartCast and would love for you to join!\n\n🛒 Room Details:\nName: ${roomName}\nRoom ID: ${roomId}\nLink: ${shareUrl}\n\n✨ Why shop together?\n• Get group discounts up to 10%\n• Free delivery on group orders\n• Reduce environmental impact\n• Discover new products together\n• Split costs on bulk items\n\n🌱 Environmental Impact:\n• Reduce CO₂ emissions through shared deliveries\n• Less packaging waste\n• Earn eco-friendly badges\n\nClick the link above to join my cart and start shopping together!\n\nHappy shopping! 🛒🌱`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const groupDiscount = total * 0.1; // 10% group discount
  const deliverySavings = members.length > 1 ? 5.99 : 0; // Free delivery for groups
  const finalTotal = total - groupDiscount - deliverySavings;

  const handleNameSave = () => {
    setIsEditingName(false);
    // In a real app, this would save to backend
  };

  const handleGuestJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      // In a real app, this would add the guest to the room
      alert(`Welcome ${guestName}! You can now shop together in this room.`);
      setGuestName('');
      setShowGuestForm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-4 max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1"
                    onBlur={handleNameSave}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                    autoFocus
                  />
                </div>
              ) : (
                <h2 
                  className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setIsEditingName(true)}
                  title="Click to edit room name"
                >
                  {roomName}
                </h2>
              )}
              <p className="text-sm text-gray-600">Room ID: {roomId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Share Options */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <span>Invite Friends</span>
                </h3>
                
                {/* Quick Share Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={shareViaWhatsApp}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <span>📱</span>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={shareViaEmail}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>

                {/* Copy Link */}
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-mono"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Quick Join for Guests */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setShowGuestForm(!showGuestForm)}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Quick join (no signup required)</span>
                  </button>
                  
                  {showGuestForm && (
                    <form onSubmit={handleGuestJoin} className="mt-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Enter your name to join"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Join
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Join as guest - no account required!
                      </p>
                    </form>
                  )}
                </div>

                {/* Email Invite */}
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Send direct invite</span>
                  </button>
                  
                  {showInviteForm && (
                    <form onSubmit={handleInviteByEmail} className="mt-3">
                      <div className="flex space-x-2">
                        <input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send</span>
                        </button>
                      </div>
                      {inviteSent && (
                        <p className="text-green-600 text-sm mt-2">✓ Invite sent successfully!</p>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Members */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Members ({members.length})</span>
                </h3>
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{member.name}</span>
                          {index === 0 && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Host
                            </span>
                          )}
                          {member.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Green Impact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span>Environmental Impact</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{greenImpact.co2Saved}kg</div>
                    <div className="text-sm text-green-800">CO₂ Emissions Saved</div>
                    <div className="text-xs text-green-600 mt-1">Equivalent to planting 2 trees</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{greenImpact.plasticSaved}%</div>
                    <div className="text-sm text-blue-800">Plastic Packaging Reduced</div>
                    <div className="text-xs text-blue-600 mt-1">Through bulk ordering</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{greenImpact.deliveriesMerged}</div>
                    <div className="text-sm text-purple-800">Delivery Trips Merged</div>
                    <div className="text-xs text-purple-600 mt-1">Reducing traffic & emissions</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>Earned Badges</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {greenImpact.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cart Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items):</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Group Discount (10%):</span>
                    <span>-${groupDiscount.toFixed(2)}</span>
                  </div>
                  {deliverySavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Delivery Savings:</span>
                      <span>-${deliverySavings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">${finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    💡 You're saving ${(groupDiscount + deliverySavings).toFixed(2)} by shopping together!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 space-y-1">
              <p>💡 <strong>Pro tip:</strong> The more friends who join, the bigger the savings!</p>
              <p>🌱 <strong>Eco-friendly:</strong> Group shopping reduces carbon footprint by up to 40%</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.open(shareUrl, '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Room</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};