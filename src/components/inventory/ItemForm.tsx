'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface ItemFormProps {
  item?: {
    _id: string;
    name: string;
    category: string;
    unit: string;
    quantity: number;
    reorderThreshold: number;
    costPrice: number;
  };
  isEdit?: boolean;
}

const commonCategories = [
  'Ingredients',
  'Toppings',
  'Dairy',
  'Meat',
  'Vegetables',
  'Spices',
  'Packaging',
  'Beverages',
  'Cleaning Supplies',
  'Equipment'
];

const commonUnits = [
  'kg',
  'g',
  'lbs',
  'oz',
  'liters',
  'ml',
  'pieces',
  'boxes',
  'bags',
  'cans'
];

export function ItemForm({ item, isEdit = false }: ItemFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || '',
    unit: item?.unit || '',
    quantity: item?.quantity || 0,
    reorderThreshold: item?.reorderThreshold || 0,
    costPrice: item?.costPrice || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater';
    }

    if (formData.reorderThreshold < 0) {
      newErrors.reorderThreshold = 'Reorder threshold must be 0 or greater';
    }

    if (formData.costPrice < 0) {
      newErrors.costPrice = 'Cost price must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const url = isEdit ? `/api/items/${item!._id}` : '/api/items';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save item');
      }

      router.push('/inventory');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Item' : 'Add New Item'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Item Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Mozzarella Cheese"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <div className="relative">
                <Input
                  list="categories"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="e.g. Dairy"
                  className={errors.category ? 'border-red-500' : ''}
                />
                <datalist id="categories">
                  {commonCategories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Unit *
              </label>
              <div className="relative">
                <Input
                  list="units"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  placeholder="e.g. kg"
                  className={errors.unit ? 'border-red-500' : ''}
                />
                <datalist id="units">
                  {commonUnits.map((unit) => (
                    <option key={unit} value={unit} />
                  ))}
                </datalist>
              </div>
              {errors.unit && (
                <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Current Quantity *
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Reorder Threshold *
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.reorderThreshold}
                onChange={(e) => handleInputChange('reorderThreshold', Number(e.target.value))}
                className={errors.reorderThreshold ? 'border-red-500' : ''}
              />
              {errors.reorderThreshold && (
                <p className="text-red-500 text-xs mt-1">{errors.reorderThreshold}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                You'll be alerted when quantity falls below this level
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cost Price *
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => handleInputChange('costPrice', Number(e.target.value))}
                className={errors.costPrice ? 'border-red-500' : ''}
                placeholder="0.00"
              />
              {errors.costPrice && (
                <p className="text-red-500 text-xs mt-1">{errors.costPrice}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Item' : 'Add Item'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/inventory')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
