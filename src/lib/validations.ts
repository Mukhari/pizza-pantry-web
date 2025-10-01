import { z } from 'zod';

export const ItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  category: z.string().min(1, 'Category is required'),
  unit: z.string().min(1, 'Unit is required'),
  quantity: z.number().min(0, 'Quantity must be 0 or greater'),
  reorderThreshold: z.number().min(0, 'Reorder threshold must be 0 or greater'),
  costPrice: z.number().min(0, 'Cost price must be 0 or greater'),
});

export const CreateItemSchema = ItemSchema;

export const UpdateItemSchema = ItemSchema.partial().extend({
  _id: z.string(),
});

export const AdjustQuantitySchema = z.object({
  itemId: z.string(),
  delta: z.number().int('Delta must be a whole number'),
  reason: z.string().optional(),
});

export type Item = z.infer<typeof ItemSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

export type CreateItem = z.infer<typeof CreateItemSchema>;
export type UpdateItem = z.infer<typeof UpdateItemSchema>;
export type AdjustQuantity = z.infer<typeof AdjustQuantitySchema>;

export interface AuditLog {
  _id: string;
  itemId: string;
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
