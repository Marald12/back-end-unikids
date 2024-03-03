import { Module } from '@nestjs/common'
import { ColorService } from './color.service'
import { ColorController } from './color.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ColorEntity } from './entities/color.entity'

@Module({
	controllers: [ColorController],
	providers: [ColorService],
	imports: [TypeOrmModule.forFeature([ColorEntity])]
})
export class ColorModule {}
