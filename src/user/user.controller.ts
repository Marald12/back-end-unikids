import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('add-likes-product/:id')
	@Auth()
	addLikesProduct(
		@Param('id') productId: string,
		@CurrentUser('id') userId: string
	) {
		return this.userService.addLikesProducts(+productId, +userId)
	}

	@Get('profile')
	@Auth()
	getProfile(@CurrentUser('id') id: string) {
		return this.userService.findOne(Number(id))
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id)
	}

	@Put()
	@Auth()
	update(
		@Body() updateUserDto: UpdateUserDto,
		@CurrentUser('id') userId: string
	) {
		return this.userService.update(+userId, updateUserDto)
	}

	@Delete()
	@Auth()
	remove(@CurrentUser('id') userId: string) {
		return this.userService.remove(+userId)
	}
}
