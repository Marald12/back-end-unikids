import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { QuestionEntity } from './entities/question.entity'
import { Repository } from 'typeorm'

@Injectable()
export class QuestionService {
	constructor(
		@InjectRepository(QuestionEntity)
		private readonly questionRepository: Repository<QuestionEntity>
	) {}

	async create(dto: CreateQuestionDto) {
		return await this.questionRepository.save({
			...dto
		})
	}

	async findAll() {
		return await this.questionRepository.find()
	}

	async findOne(id: number) {
		const question = await this.questionRepository.findOneBy({ id })
		if (!question) throw new NotFoundException('Вопрос не найден')

		return question
	}

	async update(id: number, dto: UpdateQuestionDto) {
		await this.findOne(id)

		await this.questionRepository.update(id, { ...dto })

		return await this.findOne(id)
	}

	async remove(id: number) {
		await this.findOne(id)

		await this.questionRepository.delete(id)

		return 'Вопрос успешно удалён'
	}
}
