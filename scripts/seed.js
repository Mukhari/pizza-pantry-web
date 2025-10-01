const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// Define schemas (same as in the app)
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  reorderThreshold: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  costPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

// Sample data
const sampleItems = [
  {
    name: 'Mozzarella Cheese',
    category: 'Dairy',
    unit: 'kg',
    quantity: 25,
    reorderThreshold: 5,
    costPrice: 12.50,
    createdBy: 'seed-script'
  },
  {
    name: 'Pizza Dough',
    category: 'Ingredients',
    unit: 'pieces',
    quantity: 50,
    reorderThreshold: 10,
    costPrice: 1.25,
    createdBy: 'seed-script'
  },
  {
    name: 'Tomato Sauce',
    category: 'Ingredients',
    unit: 'liters',
    quantity: 15,
    reorderThreshold: 3,
    costPrice: 4.50,
    createdBy: 'seed-script'
  },
  {
    name: 'Pepperoni',
    category: 'Meat',
    unit: 'kg',
    quantity: 8,
    reorderThreshold: 2,
    costPrice: 18.75,
    createdBy: 'seed-script'
  },
  {
    name: 'Bell Peppers',
    category: 'Vegetables',
    unit: 'kg',
    quantity: 12,
    reorderThreshold: 3,
    costPrice: 3.25,
    createdBy: 'seed-script'
  },
  {
    name: 'Mushrooms',
    category: 'Vegetables',
    unit: 'kg',
    quantity: 7,
    reorderThreshold: 2,
    costPrice: 5.50,
    createdBy: 'seed-script'
  },
  {
    name: 'Italian Sausage',
    category: 'Meat',
    unit: 'kg',
    quantity: 10,
    reorderThreshold: 2,
    costPrice: 16.25,
    createdBy: 'seed-script'
  },
  {
    name: 'Parmesan Cheese',
    category: 'Dairy',
    unit: 'kg',
    quantity: 3,
    reorderThreshold: 1,
    costPrice: 22.50,
    createdBy: 'seed-script'
  },
  {
    name: 'Olive Oil',
    category: 'Ingredients',
    unit: 'liters',
    quantity: 5,
    reorderThreshold: 1,
    costPrice: 8.75,
    createdBy: 'seed-script'
  },
  {
    name: 'Pizza Boxes (Large)',
    category: 'Packaging',
    unit: 'pieces',
    quantity: 100,
    reorderThreshold: 20,
    costPrice: 0.75,
    createdBy: 'seed-script'
  },
  {
    name: 'Oregano',
    category: 'Spices',
    unit: 'g',
    quantity: 500,
    reorderThreshold: 100,
    costPrice: 0.02,
    createdBy: 'seed-script'
  },
  {
    name: 'Basil',
    category: 'Spices',
    unit: 'g',
    quantity: 250,
    reorderThreshold: 50,
    costPrice: 0.04,
    createdBy: 'seed-script'
  },
  {
    name: 'Red Onions',
    category: 'Vegetables',
    unit: 'kg',
    quantity: 8,
    reorderThreshold: 2,
    costPrice: 2.25,
    createdBy: 'seed-script'
  },
  {
    name: 'Black Olives',
    category: 'Toppings',
    unit: 'kg',
    quantity: 4,
    reorderThreshold: 1,
    costPrice: 6.50,
    createdBy: 'seed-script'
  },
  {
    name: 'Coca Cola',
    category: 'Beverages',
    unit: 'cans',
    quantity: 150,
    reorderThreshold: 30,
    costPrice: 0.85,
    createdBy: 'seed-script'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing items
    console.log('Clearing existing items...');
    await Item.deleteMany({});

    // Insert sample items
    console.log('Inserting sample items...');
    await Item.insertMany(sampleItems);

    console.log(`Successfully seeded ${sampleItems.length} items!`);
    console.log('Sample items include:');
    sampleItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}): ${item.quantity} ${item.unit}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();
