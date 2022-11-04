import { AuthRegisterDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService,
	) { }

	@UsePipes(new ValidationPipe())
	@Post('login')
	async login(@Body() dto: LoginAuthDto) {
		const { id } = await this.authService.validateUser(dto);
		return await this.authService.login(id);
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	@HttpCode(HttpStatus.OK)
	async register(@Body() dto: AuthRegisterDto) {
		const { id } = await this.authService.register(dto);
		return await this.authService.login(id);
	}
}
