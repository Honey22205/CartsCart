import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem('cartcast_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
        localStorage.removeItem('cartcast_user');
      }
      setIsLoading(false);
    };

    checkStoredUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Simple validation
        if (!email || !password) {
          reject(new Error('Email and password are required'));
          return;
        }

        if (!email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        // Create mock user
        const mockUser: User = {
          id: Date.now().toString(),
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email,
          verified: true,
          joinedAt: new Date()
        };

        setUser(mockUser);
        localStorage.setItem('cartcast_user', JSON.stringify(mockUser));
        resolve();
      }, 1500);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Simple validation
        if (!name || !email || !password) {
          reject(new Error('All fields are required'));
          return;
        }

        if (!email.includes('@')) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        if (name.length < 2) {
          reject(new Error('Name must be at least 2 characters'));
          return;
        }

        // Create mock user (initially unverified)
        const mockUser: User = {
          id: Date.now().toString(),
          name: name.trim(),
          email,
          verified: false,
          joinedAt: new Date()
        };

        setUser(mockUser);
        localStorage.setItem('cartcast_user', JSON.stringify(mockUser));

        // Simulate email verification after 3 seconds
        setTimeout(() => {
          const verifiedUser = { ...mockUser, verified: true };
          setUser(verifiedUser);
          localStorage.setItem('cartcast_user', JSON.stringify(verifiedUser));
        }, 3000);

        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cartcast_user');
    // Also clear cart data on logout
    localStorage.removeItem('cart');
  };

  return { user, isLoading, login, signup, logout };
};