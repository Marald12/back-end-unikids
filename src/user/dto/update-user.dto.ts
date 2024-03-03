export class UpdateUserDto {
	name: string
	surname: string
	phone: number
	dateBirthday: string
	country: string
	city: string
	avatarPath: string
	sex: 'male' | 'girl'
}
