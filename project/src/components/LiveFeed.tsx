import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Zap, Leaf, Heart, Clock } from 'lucide-react';
import { mockLiveFeed } from '../data/mockData';
import { LiveFeedItem } from '../types';

export const LiveFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<LiveFeedItem[]>(mockLiveFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        '5 users just shared their cart for group delivery',
        'Organic products trending in your area',
        'Weekend sale: 30% off electronics',
        'Eco-friendly packaging reduced waste by 15%',
        'Flash deal: Free shipping on orders over $50'
      ];

      const newItem: LiveFeedItem = {
        id: Date.now().toString(),
        message: newMessages[Math.floor(Math.random() * newMessages.length)],
        timestamp: new Date(),
        type: ['trending', 'nearby', 'discount', 'eco'][Math.floor(Math.random() * 4)] as any,
        icon: ['trending-up', 'users', 'zap', 'leaf'][Math.floor(Math.random() * 4)]
      };

      setFeedItems(current => [newItem, ...current.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-4 h-4" />;
      case 'trending-up':
        return <TrendingUp className="w-4 h-4" />;
      case 'zap':
        return <Zap className="w-4 h-4" />;
      case 'leaf':
        return <Leaf className="w-4 h-4" />;
      case 'heart':
        return <Heart className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'trending':
        return 'bg-purple-100 text-purple-800';
      case 'nearby':
        return 'bg-blue-100 text-blue-800';
      case 'discount':
        return 'bg-orange-100 text-orange-800';
      case 'eco':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Live CartCast</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className={`p-2 rounded-full ${getColor(item.type)}`}>
              {getIcon(item.icon)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.message}</p>
              <p className="text-xs text-gray-500 mt-1">{formatTime(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};