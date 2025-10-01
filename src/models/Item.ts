import mongoose from 'mongoose';

export interface IItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderThreshold: number;
  costPrice: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const itemSchema = new mongoose.Schema<IItem>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name must be less than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be 0 or greater'],
    default: 0
  },
  reorderThreshold: {
    type: Number,
    required: [true, 'Reorder threshold is required'],
    min: [0, 'Reorder threshold must be 0 or greater'],
    default: 0
  },
  costPrice: {
    type: Number,
    required: [true, 'Cost price is required'],
    min: [0, 'Cost price must be 0 or greater'],
    default: 0
  },
  createdBy: {
    type: String,
    required: [true, 'Created by is required']
  }
}, {
  timestamps: true
});

// Index for better query performance
itemSchema.index({ category: 1 });
itemSchema.index({ name: 'text' });

export const Item = mongoose.models.Item || mongoose.model<IItem>('Item', itemSchema);
