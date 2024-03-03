import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ReviewEntity } from './entities/review.entity'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { ProductService } from '../product/product.service'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(ReviewEntity)
		private readonly reviewRepository: Repository<ReviewEntity>,
		private readonly userService: UserService,
		private readonly productService: ProductService
	) {}

	async create(dto: CreateReviewDto, userId: number, productId: number) {
		await this.userService.findOne(userId)
		await this.productService.findOne(productId)

		return await this.reviewRepository.save({
			...dto,
			user: { id: userId },
			product: { id: productId }
		})
	}

	async findAll() {
		return await this.reviewRepository.find({
			relations: {
				product: true,
				user: true
			}
		})
	}

	async findOne(id: number) {
		const review = await this.reviewRepository.findOne({
			where: { id },
			relations: {
				product: true,
				user: true
			}
		})
		if (!review) throw new NotFoundException('Отзыв не найден')

		return review
	}
}
