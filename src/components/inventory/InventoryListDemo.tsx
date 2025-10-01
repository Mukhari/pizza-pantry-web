'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InventoryItem } from './InventoryItem';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

// Demo data for UI testing
const demoItems = [
  {
    _id: '1',
    name: 'Mozzarella Cheese',
    category: 'Dairy',
    unit: 'kg',
    quantity: 25,
    reorderThreshold: 5,
    costPrice: 12.50,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    createdBy: 'demo-user'
  },
  {
    _id: '2',
    name: 'Pizza Dough',
    category: 'Ingredients',
    unit: 'pieces',
    quantity: 50,
    reorderThreshold: 10,
    costPrice: 1.25,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    createdBy: 'demo-user'
  },
  {
    _id: '3',
    name: 'Pepperoni',
    category: 'Meat',
    unit: 'kg',
    quantity: 2, // Low stock for demo
    reorderThreshold: 5,
    costPrice: 18.75,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    createdBy: 'demo-user'
  },
  {
    _id: '4',
    name: 'Bell Peppers',
    category: 'Vegetables',
    unit: 'kg',
    quantity: 12,
    reorderThreshold: 3,
    costPrice: 3.25,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    createdBy: 'demo-user'
  }
];

const demoCategories = ['Dairy', 'Ingredients', 'Meat', 'Vegetables'];

interface Item {
  _id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export function InventoryListDemo() {
  const [items, setItems] = useState<Item[]>(demoItems);
  const [categories] = useState<string[]>(demoCategories);
  const [loading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort demo items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof Item];
    const bValue = b[sortBy as keyof Item];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleUpdate = () => {
    // For demo purposes, just show an alert
    alert('This is a demo - database integration required for full functionality');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Demo Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            <p className="text-blue-800">
              <strong>Demo Mode:</strong> This is showing sample data. Connect your database to see real inventory.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="quantity-asc">Quantity (Low-High)</option>
              <option value="quantity-desc">Quantity (High-Low)</option>
              <option value="category-asc">Category (A-Z)</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSortBy('name');
                setSortOrder('asc');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <InventoryItem
              key={item._id}
              item={item}
              onUpdate={handleUpdate}
              isDemo={true}
            />
          ))}
        </div>
      )}

      {/* Demo Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">{items.length}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {items.filter(item => item.quantity <= item.reorderThreshold).length}
              </p>
              <p className="text-sm text-gray-600">Low Stock</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
              <p className="text-sm text-gray-600">Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                ${items.reduce((total, item) => total + (item.quantity * item.costPrice), 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
