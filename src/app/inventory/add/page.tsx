import { ItemForm } from '@/components/inventory/ItemForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AddItemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/inventory">
              <Button variant="outline">← Back to Inventory</Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
          <p className="text-gray-600 mt-2">Add a new item to your inventory</p>
        </div>
        
        <ItemForm />
      </div>
    </div>
  );
}
