import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍕 Pizza Pantry Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            UI Testing Mode - No Database Required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">✅ What's Working</h2>
            <ul className="space-y-2">
              <li>✅ Next.js 15 App Router</li>
              <li>✅ TypeScript compilation</li>
              <li>✅ Tailwind CSS styling</li>
              <li>✅ Component architecture</li>
              <li>✅ Responsive design</li>
              <li>✅ Demo inventory data</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">🚧 Coming Next</h2>
            <ul className="space-y-2">
              <li>🔧 MongoDB connection</li>
              <li>🔧 Clerk authentication</li>
              <li>🔧 API integration</li>
              <li>🔧 Real-time updates</li>
              <li>🔧 Audit logging</li>
              <li>🔧 Production deployment</li>
            </ul>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link 
            href="/inventory" 
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            View Demo Inventory →
          </Link>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🎯 Next Steps to Complete Setup
            </h3>
            <ol className="text-left text-blue-800 space-y-1 max-w-2xl mx-auto">
              <li>1. Set up MongoDB (local or Atlas)</li>
              <li>2. Configure Clerk authentication</li>
              <li>3. Update environment variables</li>
              <li>4. Enable real API endpoints</li>
              <li>5. Test with real data</li>
            </ol>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold mb-2">Inventory Items</h3>
            <p className="text-gray-600 text-sm">Track all your pizza ingredients</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-2">Smart Analytics</h3>
            <p className="text-gray-600 text-sm">Monitor stock levels and trends</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600 text-sm">User authentication and permissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
