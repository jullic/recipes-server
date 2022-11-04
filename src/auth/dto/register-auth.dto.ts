import { IsEmail, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { authErrors } from '../auth.constants';

export class AuthRegisterDto {

	@IsString()
	@MinLength(2, { message: authErrors.REGISTER_NAME_LENGTH_ERROR })
	readonly name: string;

	@IsString()
	@MinLength(2, { message: authErrors.REGISTER_LASTNAME_LENGTH_ERROR })
	readonly lastName: string;

	@IsOptional()
	@IsUrl()
	readonly img: string;

	@IsEmail({ message: authErrors.AUTH_EMAIL_ERROR })
	readonly email: string;

	@IsString()
	@MinLength(6, { message: authErrors.REGISTER_PASSWORD_LENGTH_ERROR })
	readonly password: string;
}