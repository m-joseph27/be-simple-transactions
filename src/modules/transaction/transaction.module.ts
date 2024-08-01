import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './transaction.schema';
import { Item, ItemSchema } from '../item/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
