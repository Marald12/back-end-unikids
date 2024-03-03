import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MainCategoryEntity } from './entities/main.category.entity'
import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(MainCategoryEntity)
		private readonly mainCategoryRepository: Repository<MainCategoryEntity>,
		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>
	) {}

	async createMainCategory(dto: CreateCategoryDto) {
		return await this.mainCategoryRepository.save({
			...dto
		})
	}

	async createCategory(dto: CreateCategoryDto) {
		return await this.categoryRepository.save({
			...dto
		})
	}

	async findAllMainCategory() {
		return await this.mainCategoryRepository.find()
	}

	async findAllCategory() {
		return await this.categoryRepository.find()
	}

	async findOneMainCategory(id: number) {
		const mainCategory = await this.mainCategoryRepository.findOne({
			where: { id },
			relations: {
				products: true
			}
		})
		if (!mainCategory) throw new NotFoundException('Категория не найдена!')

		return mainCategory
	}

	async findOneCategory(id: number) {
		const category = await this.categoryRepository.findOne({
			where: { id },
			relations: {
				products: true
			}
		})
		if (!category) throw new NotFoundException('Категория не найдена!')

		return category
	}

	async updateMainCategory(id: number, dto: CreateCategoryDto) {
		await this.findOneMainCategory(id)

		await this.mainCategoryRepository.update(id, { ...dto })

		return await this.findOneMainCategory(id)
	}

	async updateCategory(id: number, dto: CreateCategoryDto) {
		await this.findOneCategory(id)

		await this.categoryRepository.update(id, { ...dto })

		return await this.findOneCategory(id)
	}
}
