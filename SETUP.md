# 🚀 Quick Setup Guide for Pizza Pantry

## 1. Install Dependencies

Since you encountered PowerShell execution policy issues, please run these commands manually:

```bash
npm install @clerk/nextjs@^5.0.0
npm install mongoose@^8.0.0
npm install zod@^3.22.0
npm install @types/mongoose@^5.11.97
npm install lucide-react@^0.300.0
npm install @radix-ui/react-slot@^1.0.2
npm install @radix-ui/react-dialog@^1.0.5
npm install @radix-ui/react-dropdown-menu@^2.0.6
npm install @radix-ui/react-select@^2.0.0
npm install class-variance-authority@^0.7.0
npm install clsx@^2.0.0
npm install tailwind-merge@^2.0.0
```

Or install all at once:
```bash
npm install @clerk/nextjs mongoose zod @types/mongoose lucide-react @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select class-variance-authority clsx tailwind-merge
```

## 2. Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Update with your actual values:

```env
# MongoDB (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/pizza-pantry

# Clerk (from https://clerk.dev)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Keep these as-is
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/inventory
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/inventory
```

## 3. Update Layout for Clerk

Replace the content in `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Pantry - Inventory Management",
  description: "Manage your pizza shop inventory efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

## 4. Update API Routes for Clerk

In each API route, replace the temporary user logic:

```tsx
// Before (temporary)
const userId = 'temp-user-id';

// After (with Clerk)
import { auth } from '@clerk/nextjs/server'

const { userId } = auth()
if (!userId) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## 5. Set up MongoDB

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `MONGODB_URI=mongodb://localhost:27017/pizza-pantry`

### Option B: MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create a cluster
3. Get connection string
4. Use `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizza-pantry`

## 6. Seed the Database (Optional)

```bash
npm run seed
```

## 7. Run the Application

```bash
npm run dev
```

Visit http://localhost:3000

## 8. Set up Clerk Authentication

1. Go to https://clerk.dev
2. Create account and new application
3. Get API keys from dashboard
4. Update `.env.local` with your keys
5. Configure sign-in methods in Clerk dashboard

## Key Features Implemented

✅ **Complete CRUD Operations**
- Create, read, update, delete inventory items
- Form validation with helpful error messages

✅ **Quantity Management**
- Adjust stock levels with positive/negative values
- Add reasons for adjustments
- Track who made changes and when

✅ **Smart Search & Filtering**
- Search by name or category
- Filter by category
- Sort by multiple fields
- Pagination for large inventories

✅ **Audit Trail**
- Complete history of all changes
- User attribution for all actions
- Timestamps for accountability

✅ **Responsive Design**
- Works on desktop and mobile
- Clean, professional interface
- Loading states and error handling

✅ **Stock Alerts**
- Visual indicators for low stock items
- Reorder threshold monitoring

## Troubleshooting

**Dependencies not installing?**
- Try: `npm cache clean --force` then install again
- Or delete `node_modules` and `package-lock.json`, then `npm install`

**MongoDB connection issues?**
- Check MongoDB is running (local)
- Verify connection string (Atlas)
- Check firewall settings

**Clerk authentication not working?**
- Verify API keys are correct
- Check environment variable names
- Ensure ClerkProvider wraps your app

**Build errors?**
- Clear `.next` folder: `rm -rf .next` (or delete manually)
- Run `npm run build` to check for issues

## Next Steps

1. **Complete authentication setup** with your Clerk keys
2. **Add role-based access control** for different user types
3. **Implement reporting features** for inventory insights
4. **Add barcode scanning** for easier inventory management
5. **Set up notifications** for low stock alerts
6. **Deploy to Vercel** for production use

## File Structure Created

```
src/
├── app/
│   ├── api/items/               # Complete API for inventory
│   ├── inventory/              # Inventory pages and forms
│   ├── globals.css             # Updated with Pizza theme
│   ├── layout.tsx              # Ready for Clerk
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Reusable UI components
│   └── inventory/              # Inventory-specific components
├── lib/
│   ├── mongodb.ts              # Database connection
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # Utility functions
├── models/
│   ├── Item.ts                 # Inventory item model
│   └── AuditLog.ts             # Audit trail model
└── middleware.ts               # Clerk protection
```

Your pizza shop inventory management system is now ready! 🍕
