import { LiveFeedItem, WeatherData, Suggestion } from '../types';

export const mockWeather: WeatherData = {
  condition: 'Rainy',
  temperature: 65,
  humidity: 78,
  icon: 'cloud-rain'
};

export const mockLiveFeed: LiveFeedItem[] = [
  {
    id: '1',
    message: '3 users near you just added Wireless Headphones',
    timestamp: new Date(Date.now() - 300000),
    type: 'nearby',
    icon: 'users'
  },
  {
    id: '2',
    message: 'Sunscreen trending this weekend - 40% off!',
    timestamp: new Date(Date.now() - 600000),
    type: 'trending',
    icon: 'trending-up'
  },
  {
    id: '3',
    message: 'Eco-friendly packaging saved 2.3kg CO2 today',
    timestamp: new Date(Date.now() - 900000),
    type: 'eco',
    icon: 'leaf'
  },
  {
    id: '4',
    message: 'Flash sale: Electronics 25% off for next 2 hours',
    timestamp: new Date(Date.now() - 1200000),
    type: 'discount',
    icon: 'zap'
  },
  {
    id: '5',
    message: '12 people shared carts this hour - saving the planet!',
    timestamp: new Date(Date.now() - 1500000),
    type: 'eco',
    icon: 'heart'
  }
];

export const mockEvents = [
  {
    id: '1',
    name: 'Birthday Party',
    date: new Date(Date.now() + 86400000 * 2),
    type: 'birthday'
  },
  {
    id: '2',
    name: 'Office Lunch',
    date: new Date(Date.now() + 86400000),
    type: 'office'
  },
  {
    id: '3',
    name: 'Diwali Celebration',
    date: new Date(Date.now() + 86400000 * 7),
    type: 'festival'
  }
];

export const environmentalBadges = [
  { name: 'Eco Shopper', icon: 'leaf', requirement: 'Share 3 carts' },
  { name: 'Smart Saver', icon: 'brain', requirement: 'Save 10kg CO2' },
  { name: 'Green Warrior', icon: 'shield', requirement: 'Reduce 50% plastic' },
  { name: 'Community Hero', icon: 'heart', requirement: 'Help 20 shoppers' }
];