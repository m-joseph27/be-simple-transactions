import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  customerCode: string;

  @Prop({ required: true })
  customerName: string;

  @Prop()
  customerTelp: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);