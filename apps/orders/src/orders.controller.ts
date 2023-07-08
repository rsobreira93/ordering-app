import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrdersService, GetOrdersService } from './services';
import { CreateOrderDTO } from './dtos/create-order';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrdersService: CreateOrdersService,
    private readonly getOrdersService: GetOrdersService,
  ) {}
  @Post()
  async createOrder(@Body() request: CreateOrderDTO) {
    return await this.createOrdersService.execute(request);
  }

  @Get()
  async getOrders() {
    return await this.getOrdersService.execute();
  }
}
