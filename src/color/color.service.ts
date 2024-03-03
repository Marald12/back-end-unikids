import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateColorDto } from './dto/create-color.dto'
import { UpdateColorDto } from './dto/update-color.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ColorEntity } from './entities/color.entity'

@Injectable()
export class ColorService {
	constructor(
		@InjectRepository(ColorEntity)
		private readonly colorRepository: Repository<ColorEntity>
	) {}

	async create(dto: CreateColorDto) {
		return await this.colorRepository.save({
			...dto
		})
	}

	async findAll() {
		return await this.colorRepository.find()
	}

	async findOne(id: number) {
		const color = await this.colorRepository.findOneBy({ id })
		if (!color) throw new NotFoundException('Цвет не найден')

		return color
	}

	async update(id: number, dto: UpdateColorDto) {
		await this.findOne(id)
		await this.colorRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.colorRepository.delete(id)

		return 'Цвет успешно удалён'
	}
}
