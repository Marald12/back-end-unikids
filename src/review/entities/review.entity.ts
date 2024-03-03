import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { ProductEntity } from '../../product/entities/product.entity'

@Entity('Review')
export class ReviewEntity extends BaseEntity {
	@Column({ type: 'text' })
	description: string

	@Column({ name: 'star_count' })
	starCount: number

	@Column({ default: null })
	dignity: string

	@Column({ default: null })
	flaws: string

	@ManyToOne(() => UserEntity, user => user.reviews)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => ProductEntity, product => product.reviews)
	@JoinColumn({ name: 'product_id' })
	product: ProductEntity
}
