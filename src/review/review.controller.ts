import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post(':id')
	@Auth()
	@UsePipes(new ValidationPipe())
	create(
		@Body() dto: CreateReviewDto,
		@CurrentUser('id') userId: string,
		@Param('id') productId: string
	) {
		return this.reviewService.create(dto, +userId, +productId)
	}

	@Get()
	findAll() {
		return this.reviewService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewService.findOne(+id)
	}
}
