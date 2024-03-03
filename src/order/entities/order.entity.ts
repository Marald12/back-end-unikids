import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne
} from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { BasketItemEntity } from '../../basket/entities/basket.item.entity'

@Entity('Order')
export class OrderEntity extends BaseEntity {
	@Column({ name: 'type_delivery' })
	typeDelivery: 'courier' | 'pickupPoint' | 'pickup'

	@Column({ name: 'time_delivery' })
	timeDelivery: string

	@Column({ name: 'type_pay' })
	typePay: 'card' | 'cash' | 'cardOnline'

	@Column()
	city: string

	@Column()
	street: string

	@Column()
	house: string

	@Column({ default: null })
	room: string

	@Column({ default: null })
	entrance: string

	@Column({ default: null })
	floor: string

	@ManyToMany(() => BasketItemEntity)
	@JoinTable()
	products: BasketItemEntity[]

	@ManyToOne(() => UserEntity, user => user.orders)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity
}
