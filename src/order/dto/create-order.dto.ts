import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { ProductEntity } from '../../product/entities/product.entity'

export class CreateOrderDto {
	@IsString({ message: 'Тип дсотавки не являеться строкой' })
	@IsNotEmpty({ message: 'Тип дсотавки пустой' })
	typeDelivery: 'courier' | 'pickupPoint' | 'pickup'

	@IsString({ message: 'Время доставки не являеться строкой' })
	@IsNotEmpty({ message: 'Время доставки пустое' })
	timeDelivery: string

	@IsString({ message: 'Тип оплаты не являеться строкой' })
	@IsNotEmpty({ message: 'Тип оплаты пустое' })
	typePay: 'card' | 'cash' | 'cardOnline'

	@IsString({ message: 'Поле город не являеться строкой' })
	@IsNotEmpty({ message: 'Поле город пустое' })
	city: string

	@IsString({ message: 'Поле улица не являеться строкой' })
	@IsNotEmpty({ message: 'Поле улица пустое' })
	street: string

	@IsString({ message: 'Поле дом не являеться строкой' })
	@IsNotEmpty({ message: 'Поле дом пустое' })
	house: string

	room: string
	entrance: string
	floor: string

	@IsArray({ message: 'Массив продутов не валиден' })
	@IsNotEmpty({ message: 'Массив продутов пуст' })
	products: ProductEntity[]
}
