import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@Auth()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateOrderDto, @CurrentUser('id') id: string) {
		return this.orderService.create(dto, +id)
	}

	@Get()
	findAll() {
		return this.orderService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.orderService.findOne(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
		return this.orderService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.orderService.remove(+id)
	}
}
