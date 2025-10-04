import { Product } from '../types';

export const products: Product[] = [
  // Groceries
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh organic bananas, perfect for breakfast',
    inStock: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    price: 3.49,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Nutritious whole grain bread',
    inStock: true,
    rating: 4.2,
    reviews: 156
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    price: 4.99,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Creamy Greek yogurt, high in protein',
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '4',
    name: 'Chicken Noodle Soup',
    price: 2.49,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/8969226/pexels-photo-8969226.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Comforting chicken noodle soup',
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: '5',
    name: 'Hot Chocolate Mix',
    price: 3.99,
    category: 'Groceries',
    image: 'https://images.pexels.com/photos/1797103/pexels-photo-1797103.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Rich and creamy hot chocolate mix',
    inStock: true,
    rating: 4.6,
    reviews: 123
  },

  // Electronics
  {
    id: '6',
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'High-quality wireless headphones',
    inStock: true,
    rating: 4.4,
    reviews: 892
  },
  {
    id: '7',
    name: 'Smartphone Charger',
    price: 19.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fast charging smartphone charger',
    inStock: true,
    rating: 4.1,
    reviews: 445
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Portable Bluetooth speaker',
    inStock: true,
    rating: 4.5,
    reviews: 278
  },

  // Clothing
  {
    id: '9',
    name: 'Cotton T-Shirt',
    price: 12.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Comfortable cotton t-shirt',
    inStock: true,
    rating: 4.3,
    reviews: 567
  },
  {
    id: '10',
    name: 'Winter Jacket',
    price: 89.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Warm winter jacket',
    inStock: true,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '11',
    name: 'Jeans',
    price: 39.99,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Classic denim jeans',
    inStock: true,
    rating: 4.2,
    reviews: 789
  },

  // Home & Garden
  {
    id: '12',
    name: 'LED Desk Lamp',
    price: 29.99,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Adjustable LED desk lamp',
    inStock: true,
    rating: 4.4,
    reviews: 156
  },
  {
    id: '13',
    name: 'Plant Pot',
    price: 14.99,
    category: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Decorative plant pot',
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '14',
    name: 'Moisturizer',
    price: 15.99,
    category: 'Health & Beauty',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Hydrating face moisturizer',
    inStock: true,
    rating: 4.5,
    reviews: 345
  },

  // Sports & Outdoors
  {
    id: '15',
    name: 'Sunscreen SPF 50',
    price: 8.99,
    category: 'Health & Beauty',
    image: 'https://images.pexels.com/photos/1831744/pexels-photo-1831744.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'High protection sunscreen',
    inStock: true,
    rating: 4.6,
    reviews: 445
  },
  {
    id: '16',
    name: 'Yoga Mat',
    price: 24.99,
    category: 'Sports & Outdoors',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Non-slip yoga mat',
    inStock: true,
    rating: 4.4,
    reviews: 234
  },
  {
    id: '17',
    name: 'Water Bottle',
    price: 12.99,
    category: 'Sports & Outdoors',
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Insulated water bottle',
    inStock: true,
    rating: 4.3,
    reviews: 567
  },

  // Party & Occasion
  {
    id: '18',
    name: 'Birthday Candles',
    price: 3.99,
    category: 'Party & Occasion',
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Colorful birthday candles',
    inStock: true,
    rating: 4.2,
    reviews: 156
  },
  {
    id: '19',
    name: 'Gift Wrapping Paper',
    price: 6.99,
    category: 'Party & Occasion',
    image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Festive gift wrapping paper',
    inStock: true,
    rating: 4.1,
    reviews: 89
  },
  {
    id: '20',
    name: 'Party Decorations',
    price: 15.99,
    category: 'Party & Occasion',
    image: 'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Colorful party decorations',
    inStock: true,
    rating: 4.5,
    reviews: 234
  }
];

export const categories = [
  'All',
  'Groceries',
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors',
  'Party & Occasion'
];