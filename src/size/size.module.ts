import { Module } from '@nestjs/common'
import { SizeService } from './size.service'
import { SizeController } from './size.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SizeEntity } from './entities/size.entity'

@Module({
	controllers: [SizeController],
	providers: [SizeService],
	imports: [TypeOrmModule.forFeature([SizeEntity])]
})
export class SizeModule {}
