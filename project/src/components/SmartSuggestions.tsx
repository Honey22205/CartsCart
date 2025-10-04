import React from 'react';
import { Cloud, Calendar, TrendingUp, History, Plus } from 'lucide-react';
import { products } from '../data/products';
import { mockWeather, mockEvents } from '../data/mockData';
import { Suggestion, Product } from '../types';

interface SmartSuggestionsProps {
  onAddToCart: (product: Product) => void;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ onAddToCart }) => {
  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    // Weather-based suggestions
    if (mockWeather.condition === 'Rainy') {
      const soup = products.find(p => p.name.includes('Soup'));
      if (soup) {
        suggestions.push({
          id: 'weather-1',
          product: soup,
          reason: 'Perfect for rainy weather',
          type: 'weather',
          priority: 1
        });
      }
    }

    const hotChocolate = products.find(p => p.name.includes('Hot Chocolate'));
    if (hotChocolate && mockWeather.temperature < 70) {
      suggestions.push({
        id: 'weather-2',
        product: hotChocolate,
        reason: 'Warm up with hot chocolate',
        type: 'weather',
        priority: 2
      });
    }

    const moisturizer = products.find(p => p.name.includes('Moisturizer'));
    if (moisturizer && mockWeather.temperature < 70) {
      suggestions.push({
        id: 'weather-3',
        product: moisturizer,
        reason: 'Dry winter weather protection',
        type: 'weather',
        priority: 3
      });
    }

    // Event-based suggestions
    mockEvents.forEach(event => {
      if (event.type === 'birthday') {
        const candles = products.find(p => p.name.includes('Candles'));
        if (candles) {
          suggestions.push({
            id: 'event-birthday',
            product: candles,
            reason: `Upcoming ${event.name}`,
            type: 'event',
            priority: 1
          });
        }
      }
    });

    // Trending suggestions
    const trendingProducts = products.filter(p => 
      p.name.includes('Sunscreen') || p.name.includes('Headphones')
    );
    trendingProducts.forEach((product, index) => {
      suggestions.push({
        id: `trending-${index}`,
        product,
        reason: 'Trending this week',
        type: 'trending',
        priority: 2
      });
    });

    return suggestions.sort((a, b) => a.priority - b.priority).slice(0, 6);
  };

  const suggestions = generateSuggestions();

  const getIconByType = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <History className="w-4 h-4" />;
    }
  };

  const getColorByType = (type: string) => {
    switch (type) {
      case 'weather':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'trending':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Smart Suggestions</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Cloud className="w-4 h-4" />
          <span>{mockWeather.condition} {mockWeather.temperature}°F</span>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <img
              src={suggestion.product.image}
              alt={suggestion.product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{suggestion.product.name}</h3>
              <p className="text-sm text-gray-600">${suggestion.product.price}</p>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getColorByType(suggestion.type)}`}>
                {getIconByType(suggestion.type)}
                <span>{suggestion.reason}</span>
              </div>
            </div>
            <button
              onClick={() => onAddToCart(suggestion.product)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};