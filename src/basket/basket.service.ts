import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BasketEntity } from './entities/basket.entity'
import { BasketItemEntity } from './entities/basket.item.entity'
import { ProductService } from '../product/product.service'

@Injectable()
export class BasketService {
	constructor(
		@InjectRepository(BasketEntity)
		private readonly basketRepository: Repository<BasketEntity>,
		@InjectRepository(BasketItemEntity)
		private readonly basketItemRepository: Repository<BasketItemEntity>,
		private readonly productService: ProductService
	) {}

	async create(id: number) {
		return await this.basketRepository.save({
			user: { id }
		})
	}

	async findAll() {
		return await this.basketRepository.find({
			relations: {
				products: {
					product: true
				}
			}
		})
	}

	async findOne(id: number) {
		const basket = await this.basketRepository.findOne({
			where: { id },
			relations: {
				products: {
					product: true
				}
			}
		})
		if (!basket) throw new NotFoundException('Корзина не найдена')

		return basket
	}

	async addProductToBasket(basketId: number, productId: number) {
		const basket = await this.findOne(basketId)
		const product = await this.productService.findOne(productId)

		let isLocateFromBasket = false

		const countItem = async (id: number) => {
			const basketItem = await this.basketItemRepository.findOne({
				where: { id },
				relations: {
					product: true
				}
			})
			basketItem.count++
			await this.basketItemRepository.save(basketItem)
		}

		basket.products.forEach(item => {
			if (item.product.id === product.id) {
				isLocateFromBasket = true
				countItem(item.id)
			}
		})

		if (!isLocateFromBasket) {
			const basketItem = await this.basketItemRepository.save({
				product,
				basket: { id: basketId }
			})
			basket.products.push(basketItem)
		}

		await this.basketRepository.save(basket)

		return await this.findOne(basketId)
	}

	async removeProductFromBasket(basketId: number, productId: number) {
		const basket = await this.findOne(basketId)
		const product = await this.productService.findOne(productId)

		const countItem = async (id: number) => {
			const basketItem = await this.basketItemRepository.findOne({
				where: { id },
				relations: {
					product: true
				}
			})
			basketItem.count--
			await this.basketItemRepository.save(basketItem)
		}

		const deleteItem = async (id: number) => {
			await this.basketItemRepository.delete(id)
		}

		basket.products.forEach(item => {
			if (item.product.id === product.id) {
				countItem(item.id)
			}
			if (item.count <= 0) {
				return deleteItem(item.id)
			}
		})

		await this.basketRepository.save(basket)

		return await this.findOne(basketId)
	}
}
