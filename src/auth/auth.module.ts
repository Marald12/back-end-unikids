import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserService } from '../user/user.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '../config/jwt.config'
import { UserEntity } from '../user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductService } from '../product/product.service'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'
import { ProductEntity } from '../product/entities/product.entity'
import { ColorEntity } from '../color/entities/color.entity'
import { SizeEntity } from '../size/entities/size.entity'
import { BasketEntity } from '../basket/entities/basket.entity'
import { BasketItemEntity } from '../basket/entities/basket.item.entity'
import { BasketService } from '../basket/basket.service'

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		UserService,
		ProductService,
		ColorService,
		SizeService,
		BasketService
	],
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: jwtConfig
		}),
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
export class AuthModule {}
