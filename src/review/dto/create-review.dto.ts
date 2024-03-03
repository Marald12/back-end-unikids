import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReviewDto {
	@IsString({ message: 'Описание не являеться строкой' })
	@IsNotEmpty({ message: 'Описание пустое' })
	description: string

	@IsNumber({}, { message: 'Количесвто звёзд не являеться числом' })
	@IsNotEmpty({ message: 'Количесвто звёзд пустое' })
	starCount: number

	dignity?: string
	flaws?: string
}
