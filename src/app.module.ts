import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { typeOrmConfig } from './config/typeOrm.config'
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'
import { ReviewModule } from './review/review.module'
import { OrderModule } from './order/order.module'
import { QuestionModule } from './question/question.module'
import { AuthModule } from './auth/auth.module'
import { BasketModule } from './basket/basket.module'
import { ColorModule } from './color/color.module'
import { SizeModule } from './size/size.module'
import { MediaModule } from './media/media.module'

@Module({
	imports: [
		UserModule,
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: typeOrmConfig
		}),
		ProductModule,
		CategoryModule,
		ReviewModule,
		OrderModule,
		QuestionModule,
		AuthModule,
		BasketModule,
		ColorModule,
		SizeModule,
		MediaModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
