import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entities/order.entity'
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity)
		private readonly orderRepository: Repository<OrderEntity>
	) {}

	async create(dto: CreateOrderDto, userId: number) {
		return await this.orderRepository.save({
			...dto,
			user: { id: userId }
		})
	}

	async findAll() {
		return await this.orderRepository.find({
			relations: {
				products: true,
				user: true
			}
		})
	}

	async findOne(id: number) {
		const order = await this.orderRepository.findOne({
			where: { id },
			relations: {
				products: true,
				user: true
			}
		})
		if (!order) throw new NotFoundException('Заказ не найден')

		return order
	}

	async update(id: number, dto: UpdateOrderDto) {
		await this.findOne(id)
		await this.orderRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.orderRepository.delete(id)

		return 'Заказ успешно удалён'
	}
}
