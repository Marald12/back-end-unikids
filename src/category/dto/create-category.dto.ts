import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Заголовок не являеться строкой' })
	@IsNotEmpty({ message: 'Заголовок пустой' })
	title: string
}
