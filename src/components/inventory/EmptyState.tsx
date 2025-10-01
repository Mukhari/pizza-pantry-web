import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EmptyState() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">No inventory items found</h3>
        <p className="text-gray-600 mb-6">
          Get started by adding your first inventory item to track your pizza shop supplies.
        </p>
        <Link href="/inventory/add">
          <Button className="bg-orange-600 hover:bg-orange-700">
            Add Your First Item
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
