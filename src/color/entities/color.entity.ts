import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../../utils/base.entity'

@Entity('Color')
export class ColorEntity extends BaseEntity {
	@Column()
	color: string

	@Column()
	hex: string
}
