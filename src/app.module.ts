import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './modules/item/item.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/simple-transactions'),
    CustomerModule,
    ItemModule,
    TransactionModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
