import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { ColorService } from '../color/color.service'
import { SizeService } from '../size/size.service'
import { SizeModule } from '../size/size.module'
import { ColorModule } from '../color/color.module'
import { SizeEntity } from '../size/entities/size.entity'
import { ColorEntity } from '../color/entities/color.entity'

@Module({
	controllers: [ProductController],
	providers: [ProductService, ColorService, SizeService],
	imports: [
		SizeModule,
		ColorModule,
		TypeOrmModule.forFeature([ProductEntity, SizeEntity, ColorEntity])
	]
})
export class ProductModule {}
