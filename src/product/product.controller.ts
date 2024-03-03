import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/update-product.dto'
import { CreateProductDto } from './dto/create-product.dto'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	create(
		@Body() dto: CreateProductDto,
		@Query('categoryId') categoryId: string,
		@Query('mainCategoryId') mainCategoryId: string
	) {
		return this.productService.create(dto, +categoryId, +mainCategoryId)
	}

	@Get()
	findAll(
		@Query('categoryId') categoryId?: string,
		@Query('sizeId') sizeId?: string,
		@Query('colorId') colorId?: string
	) {
		return this.productService.findAll(+categoryId, +sizeId, +colorId)
	}

	@Get('find-popular')
	findPopular() {
		return this.productService.findPopularProducts()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id)
	}

	@Post('add-color-to-product/:id')
	addColorToProduct(
		@Param('id') productId: string,
		@Query('colorId') colorId: string
	) {
		return this.productService.addColorToProduct(+productId, +colorId)
	}

	@Post('add-size-to-product/:id')
	addSizeToProduct(
		@Param('id') productId: string,
		@Query('sizeId') sizeId: string
	) {
		return this.productService.addSizeToProduct(+productId, +sizeId)
	}

	@Post('remove-color-from-product/:id')
	removeColorFromProduct(
		@Param('id') productId: string,
		@Query('colorId') colorId: string
	) {
		return this.productService.removeColorFromProduct(+productId, +colorId)
	}

	@Post('remove-size-from-product/:id')
	removeSizeFromProduct(
		@Param('id') productId: string,
		@Query('sizeId') sizeId: string
	) {
		return this.productService.removeSizeFromProduct(+productId, +sizeId)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(+id)
	}
}
