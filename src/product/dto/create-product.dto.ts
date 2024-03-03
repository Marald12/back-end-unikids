import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateProductDto {
	@IsString({ message: 'Заголовок не являеться строкой' })
	@IsNotEmpty({ message: 'Заголовок пустой' })
	title: string

	@IsString({ message: 'Описание не являеться строкой' })
	@IsNotEmpty({ message: 'Описание пустое' })
	description: string

	@IsString({ message: 'Материал не являеться строкой' })
	@IsNotEmpty({ message: 'Материал пустой' })
	material: string

	@IsString({ message: 'Габариты упаковки не являеться строкой' })
	@IsNotEmpty({ message: 'Габариты упаковки пустые' })
	packagingDimensions: string

	@IsUrl({}, { message: 'Путь до картинки не являеться ссылкой' })
	@IsNotEmpty({ message: 'Путь до картинки пустой' })
	imagePath: string

	@IsNumber({}, { message: 'Вес не являеться числом' })
	@IsNotEmpty({ message: 'Вес пустой' })
	weight: number

	@IsNumber({}, { message: 'Цена не являеться числом' })
	@IsNotEmpty({ message: 'Цена пустая' })
	price: number
}
