import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from '../customer/customer.schema';
import { Transaction } from '../transaction/transaction.schema';

export type SalesDocument = Sales & Document;

@Schema()
export class Sales {
  @Prop({ required: true })
  salesNumber: string;

  @Prop({ required: true })
  salesDate: Date;

  @Prop({ required: true })
  subTotal: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  shippingCost: number;

  @Prop({ required: true })
  grandTotal: number;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customerId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: Transaction.name, required: true })
  transactions: Types.ObjectId[];
}

export const SalesSchema = SchemaFactory.createForClass(Sales);