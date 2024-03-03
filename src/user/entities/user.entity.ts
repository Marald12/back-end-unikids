import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne
} from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { ProductEntity } from '../../product/entities/product.entity'
import { ReviewEntity } from '../../review/entities/review.entity'
import { BasketEntity } from '../../basket/entities/basket.entity'
import { OrderEntity } from '../../order/entities/order.entity'

@Entity('User')
export class UserEntity extends BaseEntity {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column()
	name: string

	@Column({ default: null })
	surname: string

	@Column({ default: null })
	phone: number

	@Column({ default: null, name: 'date_birthday' })
	dateBirthday: string

	@Column({ default: null })
	country: string

	@Column({ default: null })
	city: string

	@Column({
		default: '/uploads/avatar/default-avatar.png',
		name: 'avatar_path'
	})
	avatarPath: string

	@Column({ default: null })
	sex: 'male' | 'girl'

	@ManyToMany(() => ProductEntity)
	@JoinTable()
	likesProduct: ProductEntity[]

	@OneToMany(() => ReviewEntity, review => review.user)
	reviews: ReviewEntity[]

	@OneToOne(() => BasketEntity, basket => basket.user)
	basket: BasketEntity

	@OneToMany(() => OrderEntity, order => order.user)
	orders: OrderEntity[]
}
