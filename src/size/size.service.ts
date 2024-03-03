import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SizeEntity } from './entities/size.entity'
import { CreateSizeDto } from './dto/create-size.dto'

@Injectable()
export class SizeService {
	constructor(
		@InjectRepository(SizeEntity)
		private readonly sizeRepository: Repository<SizeEntity>
	) {}

	async create(dto: CreateSizeDto) {
		return await this.sizeRepository.save({
			...dto
		})
	}

	async findAll() {
		return await this.sizeRepository.find()
	}

	async findOne(id: number) {
		const size = await this.sizeRepository.findOneBy({ id })
		if (!size) throw new NotFoundException('Размер не найден')

		return size
	}

	async update(id: number, dto: CreateSizeDto) {
		await this.findOne(id)
		await this.sizeRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.sizeRepository.delete(id)

		return 'Цвет успешно удалён'
	}
}
