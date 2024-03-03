import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { ProductEntity } from '../../product/entities/product.entity'

@Entity('Category')
export class CategoryEntity extends BaseEntity {
	@Column()
	title: string

	@OneToMany(() => ProductEntity, product => product.category)
	products: ProductEntity[]
}
