import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SizeService } from './size.service'
import { CreateSizeDto } from './dto/create-size.dto'

@Controller('size')
export class SizeController {
	constructor(private readonly sizeService: SizeService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: CreateSizeDto) {
		return this.sizeService.create(dto)
	}

	@Get()
	findAll() {
		return this.sizeService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sizeService.findOne(+id)
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() dto: CreateSizeDto) {
		return this.sizeService.update(+id, dto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sizeService.remove(+id)
	}
}
