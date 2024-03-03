import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { FindOptionsWhereProperty, MoreThan, Repository } from 'typeorm'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly productRepository: Repository<ProductEntity>,
		private readonly colorService: ColorService,
		private readonly sizeService: SizeService
	) {}

	async create(
		dto: CreateProductDto,
		categoryId: number,
		mainCategoryId: number
	) {
		return await this.productRepository.save({
			...dto,
			category: { id: categoryId },
			mainCategory: { id: mainCategoryId }
		})
	}

	async findAll(categoryId?: number, sizeId?: number, colorId?: number) {
		let options: FindOptionsWhereProperty<ProductEntity> = {}

		if (categoryId) {
			options = {
				...options,
				category: { id: categoryId }
			}
		}
		if (sizeId) {
			options = {
				...options,
				size: { id: sizeId }
			}
		}
		if (colorId) {
			options = {
				...options,
				color: { id: colorId }
			}
		}

		return await this.productRepository.find({
			where: {
				...options
			},
			relations: {
				size: true,
				category: true,
				mainCategory: true,
				color: true,
				reviews: true
			}
		})
	}

	async findOne(id: number) {
		const product = await this.productRepository.findOne({
			where: { id },
			relations: {
				size: true,
				category: true,
				mainCategory: true,
				color: true,
				reviews: true
			}
		})
		if (!product) throw new NotFoundException('Продукт не найден')
		product.viewsCount++

		return await this.productRepository.save(product)
	}

	async findPopularProducts() {
		return await this.productRepository.find({
			where: {
				viewsCount: MoreThan(0)
			},
			relations: {
				size: true,
				category: true,
				mainCategory: true,
				color: true,
				reviews: true
			},
			order: {
				viewsCount: -1
			}
		})
	}

	async addColorToProduct(productId: number, colorId: number) {
		const product = await this.findOne(productId)
		const color = await this.colorService.findOne(colorId)

		product.color.push(color)

		return await this.productRepository.save(product)
	}

	async removeColorFromProduct(productId: number, colorId: number) {
		const product = await this.findOne(productId)
		const color = await this.colorService.findOne(colorId)

		product.color.forEach((item, index) => {
			if (item.id === color.id) delete product.color[index]
		})

		return await this.productRepository.save(product)
	}

	async addSizeToProduct(productId: number, sizeId: number) {
		const product = await this.findOne(productId)
		const size = await this.sizeService.findOne(sizeId)

		product.size.push(size)

		return await this.productRepository.save(product)
	}

	async removeSizeFromProduct(productId: number, colorId: number) {
		const product = await this.findOne(productId)
		const size = await this.sizeService.findOne(colorId)

		product.size.forEach((item, index) => {
			if (item.id === size.id) delete product.size[index]
		})

		return await this.productRepository.save(product)
	}

	async update(id: number, dto: UpdateProductDto) {
		await this.findOne(id)
		await this.productRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.productRepository.delete(id)

		return await this.findOne(id)
	}
}
