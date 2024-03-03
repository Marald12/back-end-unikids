import { BaseEntity } from '../../utils/base.entity'
import { Column, Entity } from 'typeorm'

@Entity('Question')
export class QuestionEntity extends BaseEntity {
	@Column()
	question: string

	@Column({ type: 'text' })
	answer: string
}
