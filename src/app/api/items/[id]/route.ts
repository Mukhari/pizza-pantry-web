import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Item } from '@/models/Item';
import { AuditLog } from '@/models/AuditLog';
import mongoose from 'mongoose';

// GET /api/items/[id] - Get a specific item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    const item = await Item.findById(params.id).lean();

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

// PUT /api/items/[id] - Update an item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // TODO: Replace with actual user ID from Clerk
    const userId = 'temp-user-id';

    // Get original item for audit trail
    const originalItem = await Item.findById(params.id);
    if (!originalItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Update item
    const updatedItem = await Item.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Create audit log
    await AuditLog.create({
      itemId: updatedItem!._id,
      itemName: updatedItem!.name,
      action: 'item_updated',
      userId,
      userEmail: 'temp@example.com', // TODO: Replace with actual user email
      timestamp: new Date()
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

// DELETE /api/items/[id] - Delete an item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual user ID from Clerk
    const userId = 'temp-user-id';

    const item = await Item.findByIdAndDelete(params.id);

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Create audit log
    await AuditLog.create({
      itemId: item._id,
      itemName: item.name,
      action: 'item_deleted',
      userId,
      userEmail: 'temp@example.com', // TODO: Replace with actual user email
      timestamp: new Date()
    });

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}
