import { IsNotEmpty, IsString } from 'class-validator'

export class CreateColorDto {
	@IsString({ message: 'Название цвета не являеться строкой' })
	@IsNotEmpty({ message: 'Название цвета пустой' })
	color: string

	@IsString({ message: 'HEX цвет не являеться строкой' })
	@IsNotEmpty({ message: 'HEX цвет пустое' })
	hex: string
}
