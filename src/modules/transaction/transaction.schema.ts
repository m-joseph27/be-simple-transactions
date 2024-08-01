import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Item } from '../item/item.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: Item.name, required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discountPercentage: number;

  @Prop({ required: true })
  discountAmount: number;

  @Prop({ required: true })
  priceAfterDiscount: number;

  @Prop({ required: true })
  grandTotal: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
