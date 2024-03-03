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
import { ColorService } from './color.service'
import { CreateColorDto } from './dto/create-color.dto'
import { UpdateColorDto } from './dto/update-color.dto'

@Controller('color')
export class ColorController {
	constructor(private readonly colorService: ColorService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateColorDto) {
		return this.colorService.create(dto)
	}

	@Get()
	findAll() {
		return this.colorService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.colorService.findOne(+id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() dto: UpdateColorDto) {
		return this.colorService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.colorService.remove(+id)
	}
}
