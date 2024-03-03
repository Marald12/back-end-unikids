import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
	@IsEmail({}, { message: 'E-mail не валидный' })
	@IsNotEmpty({ message: 'E-mail пустой' })
	email: string

	@IsString({ message: 'Не являеться строкой' })
	@Length(6, 32, {
		message: 'Пароль дрлжен быть не меньше 6 символов и не больше 32'
	})
	@IsNotEmpty({ message: 'Пароль пустой' })
	password: string
}
