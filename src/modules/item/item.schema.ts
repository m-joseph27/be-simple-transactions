import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  itemCode: string;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  price: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
