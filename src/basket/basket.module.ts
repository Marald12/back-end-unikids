import { Module } from '@nestjs/common'
import { BasketService } from './basket.service'
import { BasketController } from './basket.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BasketEntity } from './entities/basket.entity'
import { BasketItemEntity } from './entities/basket.item.entity'
import { ProductService } from '../product/product.service'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'
import { ProductEntity } from '../product/entities/product.entity'
import { ColorEntity } from '../color/entities/color.entity'
import { SizeEntity } from '../size/entities/size.entity'
import { UserService } from '../user/user.service'
import { UserEntity } from '../user/entities/user.entity'
import { ReviewService } from '../review/review.service'
import { ReviewEntity } from '../review/entities/review.entity'

@Module({
	controllers: [BasketController],
	providers: [
		BasketService,
		UserService,
		ProductService,
		ColorService,
		SizeService,
		ReviewService
	],
	imports: [
		TypeOrmModule.forFeature([
			BasketEntity,
			BasketItemEntity,
			ProductEntity,
			ColorEntity,
			SizeEntity,
			UserEntity,
			ReviewEntity
		])
	]
})
export class BasketModule {}
