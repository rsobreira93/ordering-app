import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders-repository';

@Injectable()
export class GetOrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async execute() {
    return await this.ordersRepository.find({});
  }
}
