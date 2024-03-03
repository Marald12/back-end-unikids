import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { ProductService } from '../product/product.service'
import { ProductEntity } from '../product/entities/product.entity'
import { ColorEntity } from '../color/entities/color.entity'
import { SizeEntity } from '../size/entities/size.entity'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'
import { BasketService } from '../basket/basket.service'
import { BasketEntity } from '../basket/entities/basket.entity'
import { BasketItemEntity } from '../basket/entities/basket.item.entity'

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		ProductService,
		ColorService,
		SizeService,
		BasketService
	],
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
			ProductEntity,
			ColorEntity,
			SizeEntity,
			BasketEntity,
			BasketItemEntity
		])
	]
})
export class UserModule {}
