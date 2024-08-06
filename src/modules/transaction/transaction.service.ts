import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { Item, ItemDocument } from '../item/item.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  async create(createTransactionDto: any): Promise<Transaction> {
    const item = await this.itemModel.findById(createTransactionDto.itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const price = item.price;
    const discountAmount = (createTransactionDto.discountPercentage / 100) * price;
    const priceAfterDiscount = price - discountAmount;
    const grandTotal = createTransactionDto.quantity * priceAfterDiscount;

    const createdTransaction = new this.transactionModel({
      itemId: createTransactionDto.itemId,
      itemName: item.itemName,
      itemCide: item.itemCode,
      quantity: createTransactionDto.quantity,
      price: price,
      discountPercentage: createTransactionDto.discountPercentage,
      discountAmount: discountAmount,
      priceAfterDiscount: priceAfterDiscount,
      grandTotal: grandTotal,
    });

    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('itemId').exec();
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionModel.findById(id).populate('itemId').exec();
  }

  async update(id: string, updateTransactionDto: any): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const item = await this.itemModel.findById(updateTransactionDto.itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const price = item.price;
    const discountAmount = (updateTransactionDto.discountPercentage / 100) * price;
    const priceAfterDiscount = price - discountAmount;
    const grandTotal = updateTransactionDto.quantity * priceAfterDiscount;

    transaction.itemId = updateTransactionDto.itemId;
    transaction.itemName = item.itemName;
    transaction.quantity = updateTransactionDto.quantity;
    transaction.price = price;
    transaction.discountPercentage = updateTransactionDto.discountPercentage;
    transaction.discountAmount = discountAmount;
    transaction.priceAfterDiscount = priceAfterDiscount;
    transaction.grandTotal = grandTotal;

    return transaction.save();
  }

  async remove(id: string): Promise<Transaction> {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }
}
