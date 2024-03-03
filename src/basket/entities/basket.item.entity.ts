import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { ProductEntity } from '../../product/entities/product.entity'
import { BasketEntity } from './basket.entity'

@Entity('BasketItem')
export class BasketItemEntity extends BaseEntity {
	@OneToOne(() => ProductEntity)
	@JoinColumn()
	product: ProductEntity

	@ManyToOne(() => BasketEntity, basket => basket.products)
	basket: BasketEntity

	@Column({ default: 1 })
	count: number
}
