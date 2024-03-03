import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { ProductEntity } from '../../product/entities/product.entity'

@Entity('MainCategory')
export class MainCategoryEntity extends BaseEntity {
	@Column()
	title: string

	@OneToMany(() => ProductEntity, product => product.mainCategory)
	products: ProductEntity[]
}
