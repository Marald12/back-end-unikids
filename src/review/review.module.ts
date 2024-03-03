import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewController } from './review.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewEntity } from './entities/review.entity'
import { UserEntity } from '../user/entities/user.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { ColorEntity } from '../color/entities/color.entity'
import { SizeEntity } from '../size/entities/size.entity'
import { UserService } from '../user/user.service'
import { ProductService } from '../product/product.service'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'
import { BasketEntity } from '../basket/entities/basket.entity'
import { BasketItemEntity } from '../basket/entities/basket.item.entity'
import { BasketService } from '../basket/basket.service'

@Module({
	controllers: [ReviewController],
	providers: [
		ReviewService,
		UserService,
		ProductService,
		ColorService,
		SizeService,
		BasketService
	],
	imports: [
		TypeOrmModule.forFeature([
			ReviewEntity,
			UserEntity,
			ProductEntity,
			ColorEntity,
			SizeEntity,
			BasketEntity,
			BasketItemEntity
		])
	]
})
export class ReviewModule {}
