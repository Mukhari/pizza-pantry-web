'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function InventoryHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-2">Manage your pizza shop inventory</p>
      </div>
      <div className="flex gap-4">
        <Link href="/inventory/add">
          <Button className="bg-orange-600 hover:bg-orange-700">
            Add Item
          </Button>
        </Link>
        <Link href="/inventory/audit">
          <Button variant="outline">
            View Audit Log
          </Button>
        </Link>
      </div>
    </div>
  );
}
