import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dtos/create-order';
import { OrdersRepository } from '../repositories/orders-repository';
import { BILLING_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CreateOrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  async execute(data: CreateOrderDTO) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(data, { session });

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          data,
        }),
      );

      await session.commitTransaction();

      return order;
    } catch (err) {
      await session.abortTransaction();

      throw err;
    }
  }
}
