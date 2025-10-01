import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Item } from '@/models/Item';
import { AuditLog } from '@/models/AuditLog';

// GET /api/items - List all items with optional search and filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Item.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Item.countDocuments(query)
    ]);

    // Get unique categories for filtering
    const categories = await Item.distinct('category');

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      categories
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST /api/items - Create a new item
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    
    // TODO: Replace with actual user ID from Clerk
    const userId = 'temp-user-id';
    
    // Validate required fields
    const { name, category, unit, quantity, reorderThreshold, costPrice } = body;
    
    if (!name || !category || !unit || quantity === undefined || reorderThreshold === undefined || costPrice === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create item
    const item = new Item({
      name,
      category,
      unit,
      quantity: Number(quantity),
      reorderThreshold: Number(reorderThreshold),
      costPrice: Number(costPrice),
      createdBy: userId
    });

    await item.save();

    // Create audit log
    await AuditLog.create({
      itemId: item._id,
      itemName: item.name,
      action: 'item_created',
      userId,
      userEmail: 'temp@example.com', // TODO: Replace with actual user email
      timestamp: new Date()
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
