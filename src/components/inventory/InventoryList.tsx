'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InventoryItem } from './InventoryItem';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

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

interface ApiResponse {
  items: Item[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  categories: string[];
}

export function InventoryList() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        category: selectedCategory,
        sortBy,
        sortOrder,
        page: page.toString(),
        limit: '10'
      });

      const response = await fetch(`/api/items?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data: ApiResponse = await response.json();
      setItems(data.items);
      setCategories(data.categories);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search, selectedCategory, sortBy, sortOrder, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchItems}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
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
              onChange={(e) => handleSearch(e.target.value)}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
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
                setPage(1);
              }}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="quantity-asc">Quantity (Low-High)</option>
              <option value="quantity-desc">Quantity (High-Low)</option>
              <option value="category-asc">Category (A-Z)</option>
              <option value="updatedAt-desc">Recently Updated</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSortBy('name');
                setSortOrder('asc');
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid gap-4">
            {items.map((item) => (
              <InventoryItem
                key={item._id}
                item={item}
                onUpdate={fetchItems}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {((page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} items
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === pagination.pages}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
