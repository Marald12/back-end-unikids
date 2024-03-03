import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionEntity } from './entities/question.entity'

@Module({
	controllers: [QuestionController],
	providers: [QuestionService],
	imports: [TypeOrmModule.forFeature([QuestionEntity])]
})
export class QuestionModule {}
