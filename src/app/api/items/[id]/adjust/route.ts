import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Item } from '@/models/Item';
import { AuditLog } from '@/models/AuditLog';

// POST /api/items/[id]/adjust - Adjust item quantity
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const body = await request.json();
    const { delta, reason } = body;

    if (typeof delta !== 'number') {
      return NextResponse.json(
        { error: 'Delta must be a number' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual user ID from Clerk
    const userId = 'temp-user-id';

    // Get current item
    const item = await Item.findById(params.id);
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    const previousQuantity = item.quantity;
    const newQuantity = previousQuantity + delta;

    if (newQuantity < 0) {
      return NextResponse.json(
        { error: 'Insufficient quantity' },
        { status: 400 }
      );
    }

    // Update quantity
    item.quantity = newQuantity;
    item.updatedAt = new Date();
    await item.save();

    // Create audit log
    await AuditLog.create({
      itemId: item._id,
      itemName: item.name,
      action: 'quantity_adjustment',
      delta,
      previousQuantity,
      newQuantity,
      reason: reason || undefined,
      userId,
      userEmail: 'temp@example.com', // TODO: Replace with actual user email
      timestamp: new Date()
    });

    return NextResponse.json({
      item,
      adjustment: {
        delta,
        previousQuantity,
        newQuantity,
        reason
      }
    });
  } catch (error) {
    console.error('Error adjusting quantity:', error);
    return NextResponse.json(
      { error: 'Failed to adjust quantity' },
      { status: 500 }
    );
  }
}
