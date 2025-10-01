import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍕 Pizza Pantry
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional inventory management for your pizza shop
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Demo (No DB)
              </Button>
            </Link>
            <Link href="/inventory">
              <Button size="lg" variant="outline">
                Full App
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📦 Inventory Tracking</CardTitle>
              <CardDescription>
                Keep track of all your ingredients and supplies with real-time quantity updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Smart Alerts</CardTitle>
              <CardDescription>
                Get notified when items fall below reorder thresholds to avoid stockouts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Audit Trail</CardTitle>
              <CardDescription>
                Complete history of all inventory changes with timestamps and user tracking
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                This is a demo version. For full functionality, set up:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2">
                <li>🔧 MongoDB connection</li>
                <li>🔧 Clerk authentication</li>
                <li>✅ UI components (working now!)</li>
                <li>✅ Demo data (sample items)</li>
              </ul>
              <div className="mt-6">
                <Link href="/demo">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Try the Demo →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
