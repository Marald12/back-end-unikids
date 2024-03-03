import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthDto } from './dto/auth.dto'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto)
		const token = await this.generateJwtToken(user.id)

		return {
			user,
			token
		}
	}

	async login(dto: AuthDto) {
		const user = await this.userService.findOneByEmail(dto.email)
		if (!user) throw new NotFoundException('Пользователь не найден')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword)
			throw new BadRequestException('E-mail или пароль неверный')

		return {
			user,
			token: await this.generateJwtToken(user.id)
		}
	}

	private async generateJwtToken(id: number) {
		return await this.jwtService.signAsync({ id })
	}
}
