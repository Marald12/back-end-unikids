import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	createCategory(@Body() dto: CreateCategoryDto) {
		return this.categoryService.createCategory(dto)
	}

	@Post('main-category')
	@UsePipes(new ValidationPipe())
	createMainCategory(@Body() dto: CreateCategoryDto) {
		return this.categoryService.createMainCategory(dto)
	}

	@Get()
	findAllCategory() {
		return this.categoryService.findAllCategory()
	}

	@Get('main-category')
	findAllMainCategory() {
		return this.categoryService.findAllMainCategory()
	}

	@Get(':id')
	findOneCategory(@Param('id') id: string) {
		return this.categoryService.findOneCategory(+id)
	}

	@Get('main-category/:id')
	findOneMainCategory(@Param('id') id: string) {
		return this.categoryService.findOneMainCategory(+id)
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe())
	updateCategory(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
		return this.categoryService.updateCategory(+id, dto)
	}

	@Patch('main-category/:id')
	@UsePipes(new ValidationPipe())
	updateMainCategory(@Param('id') id: string, @Body() dto: CreateCategoryDto) {
		return this.categoryService.updateMainCategory(+id, dto)
	}
}
