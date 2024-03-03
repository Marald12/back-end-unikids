import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'
import { UserEntity } from '../../user/entities/user.entity'
import { BasketItemEntity } from './basket.item.entity'

@Entity('Basket')
export class BasketEntity extends BaseEntity {
	@OneToMany(() => BasketItemEntity, item => item.basket)
	products: BasketItemEntity[]

	@OneToOne(() => UserEntity, user => user.basket)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity
}
