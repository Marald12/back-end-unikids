import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { QuestionService } from './question.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'

@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateQuestionDto) {
		return this.questionService.create(dto)
	}

	@Get()
	findAll() {
		return this.questionService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.questionService.findOne(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
		return this.questionService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.questionService.remove(+id)
	}
}
