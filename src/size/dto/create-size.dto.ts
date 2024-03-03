import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateSizeDto {
	@IsNumber({}, { message: 'Размер не являеться числом' })
	@IsNotEmpty({ message: 'Размер пустой' })
	size: number
}
