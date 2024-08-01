import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sales, SalesDocument } from './sales.schema';
import { Customer, CustomerDocument } from '../customer/customer.schema';
import { Transaction, TransactionDocument } from '../transaction/transaction.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sales.name) private salesModel: Model<SalesDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(createSalesDto: any): Promise<Sales> {
    const customer = await this.customerModel.findById(createSalesDto.customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const transactions = await this.transactionModel.find({
      _id: { $in: createSalesDto.transactions }
    });

    if (transactions.length !== createSalesDto.transactions.length) {
      throw new NotFoundException('Some transactions not found');
    }

    const subTotal = transactions.reduce((acc, transaction) => acc + transaction.grandTotal, 0);
    const discount = createSalesDto.discount;
    const shippingCost = createSalesDto.shippingCost;
    const grandTotal = subTotal - discount + shippingCost;

    const createdSales = new this.salesModel({
      salesNumber: createSalesDto.salesNumber,
      salesDate: createSalesDto.salesDate,
      subTotal: subTotal,
      discount: discount,
      shippingCost: shippingCost,
      grandTotal: grandTotal,
      customerId: createSalesDto.customerId,
      transactions: createSalesDto.transactions,
    });

    return createdSales.save();
  }

  async findAll(): Promise<Sales[]> {
    return this.salesModel.find().populate('customerId').populate('transactions').exec();
  }

  async findOne(id: string): Promise<Sales> {
    return this.salesModel.findById(id).populate('customerId').populate('transactions').exec();
  }

  async update(id: string, updateSalesDto: any): Promise<Sales> {
    const sales = await this.salesModel.findById(id);
    if (!sales) {
      throw new NotFoundException('Sales not found');
    }

    const customer = await this.customerModel.findById(updateSalesDto.customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const transactions = await this.transactionModel.find({
      _id: { $in: updateSalesDto.transactions }
    });

    if (transactions.length !== updateSalesDto.transactions.length) {
      throw new NotFoundException('Some transactions not found');
    }

    const subTotal = transactions.reduce((acc, transaction) => acc + transaction.grandTotal, 0);
    const discount = updateSalesDto.discount;
    const shippingCost = updateSalesDto.shippingCost;
    const grandTotal = subTotal - discount + shippingCost;

    sales.salesNumber = updateSalesDto.salesNumber;
    sales.salesDate = updateSalesDto.salesDate;
    sales.subTotal = subTotal;
    sales.discount = discount;
    sales.shippingCost = shippingCost;
    sales.grandTotal = grandTotal;
    sales.customerId = updateSalesDto.customerId;
    sales.transactions = updateSalesDto.transactions;

    return sales.save();
  }

  async remove(id: string): Promise<Sales> {
    return this.salesModel.findByIdAndDelete(id).exec();
  }
}