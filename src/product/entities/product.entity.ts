import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany
} from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { CategoryEntity } from '../../category/entities/category.entity'
import { SizeEntity } from '../../size/entities/size.entity'
import { ColorEntity } from '../../color/entities/color.entity'
import { MainCategoryEntity } from '../../category/entities/main.category.entity'
import { ReviewEntity } from '../../review/entities/review.entity'

@Entity('Product')
export class ProductEntity extends BaseEntity {
	@Column()
	title: string

	@Column({ type: 'text' })
	description: string

	@Column()
	material: string

	@Column({ name: 'packaging_dimensions' })
	packagingDimensions: string

	@Column({ type: 'float' })
	weight: number

	@Column()
	price: number

	@Column({ name: 'image_path' })
	imagePath: string

	@Column({ name: 'views_count', default: 0 })
	viewsCount: number

	@ManyToMany(() => ColorEntity)
	@JoinTable()
	color: ColorEntity[]

	@ManyToMany(() => SizeEntity)
	@JoinTable()
	size: SizeEntity[]

	@ManyToOne(() => CategoryEntity, category => category.products)
	@JoinColumn({ name: 'category_id' })
	category: CategoryEntity

	@ManyToOne(() => MainCategoryEntity, category => category.products)
	@JoinColumn({ name: 'main_category_id' })
	mainCategory: MainCategoryEntity

	@OneToMany(() => ReviewEntity, review => review.product)
	reviews: ReviewEntity[]
}
