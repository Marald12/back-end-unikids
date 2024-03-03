import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { genSalt, hash } from 'bcryptjs'
import { ProductService } from '../product/product.service'
import { BasketService } from '../basket/basket.service'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly productService: ProductService,
		private readonly basketService: BasketService
	) {}

	async create(dto: CreateUserDto) {
		const oldUser = await this.findOneByEmail(dto.email)
		if (oldUser)
			throw new BadRequestException(
				'Пользователь с таким E-mail уже существует'
			)

		const salt = await genSalt(10)

		const user = await this.userRepository.save({
			...dto,
			password: await hash(dto.password, salt)
		})

		await this.basketService.create(user.id)

		return await this.findOne(user.id)
	}

	async findAll() {
		return await this.userRepository.find({
			relations: {
				basket: true,
				reviews: true,
				likesProduct: true
			}
		})
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: {
				basket: {
					products: {
						product: true
					}
				},
				reviews: true,
				likesProduct: true
			}
		})
		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	async findOneByEmail(email: string) {
		return await this.userRepository.findOne({
			where: { email },
			select: ['id', 'email', 'name', 'password', 'createdAt', 'updatedAt'],
			relations: {
				basket: true,
				reviews: true,
				likesProduct: true
			}
		})
	}

	async addLikesProducts(productId: number, userId: number) {
		const user = await this.findOne(userId)
		const product = await this.productService.findOne(productId)
		let isLiked: boolean = false

		user.likesProduct.forEach((item, index) => {
			if (item.id === product.id) isLiked = true
			if (isLiked) delete user.likesProduct[index]
		})
		if (!isLiked) user.likesProduct.push(product)

		return await this.userRepository.save(user)
	}

	async update(id: number, dto: UpdateUserDto) {
		await this.findOne(id)

		await this.userRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)

		await this.userRepository.delete(id)
		return 'Пользователь успешно удалён'
	}
}
