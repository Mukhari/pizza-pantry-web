import mongoose from 'mongoose';

export interface IAuditLog {
  _id: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  itemName: string;
  action: 'quantity_adjustment' | 'item_created' | 'item_updated' | 'item_deleted';
  delta?: number;
  previousQuantity?: number;
  newQuantity?: number;
  reason?: string;
  userId: string;
  userEmail: string;
  timestamp: Date;
}

const auditLogSchema = new mongoose.Schema<IAuditLog>({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['quantity_adjustment', 'item_created', 'item_updated', 'item_deleted'],
    required: true
  },
  delta: {
    type: Number
  },
  previousQuantity: {
    type: Number
  },
  newQuantity: {
    type: Number
  },
  reason: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Index for better query performance
auditLogSchema.index({ itemId: 1, timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
