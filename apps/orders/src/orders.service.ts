import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order';
import { OrdersRepository } from './repositories/orders-repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async execute(data: CreateOrderDTO) {
    return await this.ordersRepository.create(data);
  }
}
