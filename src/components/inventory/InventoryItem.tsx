'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

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

interface InventoryItemProps {
  item: Item;
  onUpdate: () => void;
  isDemo?: boolean;
}

export function InventoryItem({ item, onUpdate, isDemo = false }: InventoryItemProps) {
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [adjustment, setAdjustment] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const isLowStock = item.quantity <= item.reorderThreshold;

  const handleAdjustQuantity = async () => {
    if (!adjustment || isNaN(Number(adjustment))) {
      alert('Please enter a valid number');
      return;
    }

    if (isDemo) {
      alert('Demo Mode: Quantity adjustment would be applied in real app');
      setAdjustment('');
      setReason('');
      setShowAdjustment(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/items/${item._id}/adjust`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delta: Number(adjustment),
          reason: reason || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to adjust quantity');
      }

      setAdjustment('');
      setReason('');
      setShowAdjustment(false);
      onUpdate();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    if (isDemo) {
      alert('Demo Mode: Item would be deleted in real app');
      return;
    }

    try {
      const response = await fetch(`/api/items/${item._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete item');
      }

      onUpdate();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Card className={isLowStock ? 'border-orange-500 bg-orange-50' : ''}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
              </div>
              {isLowStock && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  Low Stock
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <span className="text-gray-500">Quantity:</span>
                <p className="font-medium">{item.quantity} {item.unit}</p>
              </div>
              <div>
                <span className="text-gray-500">Reorder At:</span>
                <p className="font-medium">{item.reorderThreshold} {item.unit}</p>
              </div>
              <div>
                <span className="text-gray-500">Cost Price:</span>
                <p className="font-medium">${item.costPrice.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-500">Updated:</span>
                <p className="font-medium">{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdjustment(!showAdjustment)}
            >
              Adjust
            </Button>
            <Link href={`/inventory/${item._id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Link href={`/inventory/${item._id}/audit`}>
              <Button variant="outline" size="sm">
                History
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        {showAdjustment && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium mb-3">Adjust Quantity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Adjustment (+ to add, - to remove)
                </label>
                <Input
                  type="number"
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  placeholder="e.g. +10 or -5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Reason (optional)
                </label>
                <Input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Stock delivery, Waste"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleAdjustQuantity}
                disabled={loading}
                size="sm"
              >
                {loading ? 'Adjusting...' : 'Apply Adjustment'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAdjustment(false);
                  setAdjustment('');
                  setReason('');
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
