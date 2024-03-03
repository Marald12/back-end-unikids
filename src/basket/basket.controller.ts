import { Controller, Get, Param, Post } from '@nestjs/common'
import { BasketService } from './basket.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { UserService } from '../user/user.service'

@Controller('basket')
export class BasketController {
	constructor(
		private readonly basketService: BasketService,
		private readonly userService: UserService
	) {}

	@Post()
	@Auth()
	create(@CurrentUser('id') id: string) {
		return this.basketService.create(+id)
	}

	@Post('add-product/:id')
	@Auth()
	async addProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		const user = await this.userService.findOne(+userId)
		return this.basketService.addProductToBasket(+user.basket.id, +productId)
	}

	@Post('remove-product/:id')
	@Auth()
	async removeProduct(
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		const user = await this.userService.findOne(+userId)
		return this.basketService.removeProductFromBasket(
			+user.basket.id,
			+productId
		)
	}

	@Get()
	findAll() {
		return this.basketService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.basketService.findOne(+id)
	}
}
