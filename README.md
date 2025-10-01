# 🍕 Pizza Pantry - Inventory Management System

A modern inventory management web application built for pizza shops using Next.js 15, TypeScript, MongoDB, and Clerk authentication.

## 🚀 Features

- **Inventory Management**: Create, read, update, and delete inventory items
- **Smart Alerts**: Get notified when items fall below reorder thresholds  
- **Quantity Adjustments**: Track stock additions and removals with reasons
- **Audit Trail**: Complete history of all inventory changes
- **Search & Filter**: Find items quickly by name, category, or other criteria
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Authentication**: Secure user authentication with Clerk
- **Real-time Updates**: Instant feedback on all inventory operations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: Clerk
- **Validation**: Zod schemas
- **UI Components**: Custom components with Radix UI primitives
- **Database**: MongoDB

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Clerk account for authentication

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pizza-pantry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages** (if not already installed)
   ```bash
   npm install @clerk/nextjs mongoose zod @types/mongoose lucide-react @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select class-variance-authority clsx tailwind-merge
   ```

4. **Set up environment variables**
   
   Copy the `.env.local` file and update with your values:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the following variables:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/pizza-pantry
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pizza-pantry

   # Clerk Authentication (get these from https://clerk.dev)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...

   # App URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/inventory
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/inventory
   ```

## 🔑 Setting up Clerk Authentication

1. **Create a Clerk account** at [https://clerk.dev](https://clerk.dev)

2. **Create a new application** in your Clerk dashboard

3. **Configure sign-in/sign-up** methods (email, social providers, etc.)

4. **Get your API keys** from the API Keys section:
   - Publishable Key (starts with `pk_`)
   - Secret Key (starts with `sk_`)

5. **Update your `.env.local`** file with these keys

6. **Update the layout.tsx** file to include ClerkProvider:
   ```tsx
   import { ClerkProvider } from '@clerk/nextjs'
   
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <ClerkProvider>
         <html lang="en">
           <body>{children}</body>
         </html>
       </ClerkProvider>
     )
   }
   ```

## 🗃️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env.local`

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI`

## 🏃‍♂️ Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Sign up/Sign in** to access the inventory system

## 📁 Project Structure

```
src/
├── app/
│   ├── api/items/          # API routes for inventory operations
│   ├── inventory/          # Inventory pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Reusable UI components
│   └── inventory/          # Inventory-specific components
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── validations.ts      # Zod schemas
│   └── utils.ts            # Utility functions
└── models/
    ├── Item.ts             # Item schema
    └── AuditLog.ts         # Audit log schema
```

## 🎨 Key Components

### Inventory Management
- **InventoryList**: Main inventory display with search/filter
- **InventoryItem**: Individual item component with actions
- **ItemForm**: Add/edit form with validation
- **QuantityAdjustment**: Modal for stock adjustments

### Data Models
- **Item**: Core inventory item with quantity tracking
- **AuditLog**: Change history with user attribution

## 🔐 API Endpoints

- `GET /api/items` - List items with search/filter/pagination
- `POST /api/items` - Create new item
- `GET /api/items/[id]` - Get specific item
- `PUT /api/items/[id]` - Update item
- `DELETE /api/items/[id]` - Delete item
- `POST /api/items/[id]/adjust` - Adjust item quantity
- `GET /api/items/[id]/audit` - Get item audit trail

## 🎯 Usage Guide

### Adding Items
1. Navigate to `/inventory`
2. Click "Add Item" button
3. Fill in item details (name, category, unit, quantities, cost)
4. Submit the form

### Managing Stock
1. Find the item in the inventory list
2. Click "Adjust" to add or remove stock
3. Enter the quantity change (positive to add, negative to remove)
4. Optionally add a reason for the adjustment
5. Apply the change

### Viewing History
1. Click "History" on any inventory item
2. View complete audit trail of changes
3. See who made changes and when

## 🚨 Error Handling

The application includes comprehensive error handling:
- Form validation with helpful error messages
- API error responses with clear messaging
- Loading states for all async operations
- Graceful fallbacks for network issues

## 🔒 Security Features

- Authentication required for all operations
- Server-side validation for all inputs
- Protection against common vulnerabilities
- Audit trail for accountability

## 🎨 Design Decisions

### Why Next.js 15 App Router?
- Modern React patterns with Server Components
- Built-in API routes for backend functionality
- Excellent performance and SEO capabilities
- Type-safe development experience

### Why MongoDB?
- Flexible schema for evolving inventory needs
- Excellent performance for read-heavy operations
- Rich aggregation capabilities for reporting
- Easy scaling options

### Why Clerk?
- Modern authentication solution
- Multiple sign-in methods out of the box
- Excellent developer experience
- Production-ready security features

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificate

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Structure
- Unit tests for components
- API route testing
- Database operation testing
- Integration tests for user flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Check MongoDB is running
- Verify connection string in `.env.local`
- Check network connectivity for Atlas

**Clerk Authentication Not Working**
- Verify API keys are correct
- Check environment variable names
- Ensure ClerkProvider is properly configured

**Build Errors**
- Clear `.next` folder and rebuild
- Check for TypeScript errors
- Verify all dependencies are installed

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Clerk documentation](https://clerk.dev/docs)
- Check [MongoDB documentation](https://docs.mongodb.com/)

## 🎉 Features Roadmap

### Phase 1 (Current)
- ✅ Basic CRUD operations
- ✅ Quantity adjustments
- ✅ Audit trail
- ✅ Search and filtering

### Phase 2 (Future)
- [ ] Role-based access control
- [ ] Reporting dashboard
- [ ] Export functionality
- [ ] Mobile app
- [ ] Barcode scanning
- [ ] Supplier management
- [ ] Purchase order generation
- [ ] Low stock notifications

---

Built with ❤️ for pizza shop owners who want to keep their ingredients fresh and their inventory organized!
