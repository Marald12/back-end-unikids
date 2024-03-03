import { IsNotEmpty, IsString } from 'class-validator'

export class CreateQuestionDto {
	@IsString({ message: 'Вопрос не являеться строкой' })
	@IsNotEmpty({ message: 'Вопрос пустой' })
	question: string

	@IsString({ message: 'Ответ не являеться строкой' })
	@IsNotEmpty({ message: 'Ответ пустой' })
	answer: string
}
