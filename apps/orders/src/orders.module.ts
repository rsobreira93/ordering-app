import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import * as Joi from 'joi';
import { CreateOrdersService } from './services/create-orders.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import { OrdersRepository } from './repositories/orders-repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/orde-schema';
import { GetOrdersService } from './services/get-orders.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [CreateOrdersService, GetOrdersService, OrdersRepository],
})
export class OrdersModule {}
