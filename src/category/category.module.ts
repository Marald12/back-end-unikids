import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from './entities/category.entity'
import { MainCategoryEntity } from './entities/main.category.entity'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [TypeOrmModule.forFeature([CategoryEntity, MainCategoryEntity])]
})
export class CategoryModule {}
