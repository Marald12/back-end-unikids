import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'

@Entity('Size')
export class SizeEntity extends BaseEntity {
	@Column()
	size: number
}
