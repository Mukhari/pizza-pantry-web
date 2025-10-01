import { InventoryListDemo } from '@/components/inventory/InventoryListDemo';
import { InventoryHeader } from '@/components/inventory/InventoryHeader';

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <InventoryHeader />
        <InventoryListDemo />
      </div>
    </div>
  );
}
