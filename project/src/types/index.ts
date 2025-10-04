export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  joinedAt: Date;
}

export interface CartRoom {
  id: string;
  name: string;
  createdBy: string;
  members: User[];
  items: CartItem[];
  createdAt: Date;
  totalSavings: number;
  greenImpact: GreenImpact;
}

export interface GreenImpact {
  co2Saved: number;
  plasticSaved: number;
  deliveriesMerged: number;
  badges: string[];
}

export interface Suggestion {
  id: string;
  product: Product;
  reason: string;
  type: 'weather' | 'event' | 'trending' | 'history';
  priority: number;
}

export interface LiveFeedItem {
  id: string;
  message: string;
  timestamp: Date;
  type: 'trending' | 'nearby' | 'discount' | 'eco';
  icon: string;
}

export interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  icon: string;
}