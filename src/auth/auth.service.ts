import { LoginAuthDto } from './dto/login-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { authErrors } from './auth.constants';
import { AuthRegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) { }

	async register(dto: AuthRegisterDto) {
		const isUser = await this.usersService.findUserByEmail(dto.email);
		if (isUser) {
			throw new UnauthorizedException(authErrors.ALREADY_REGISTERED_ERROR);
		}

		const { password, ...dataDto } = dto;
		const salt = await genSalt(10);
		const data = {
			...dataDto,
			passwordHash: await hash(password, salt),
		}
		const id = await (await this.usersService.createUser(data))._id;
		return { id };
	}

	async validateUser({ email, password }: LoginAuthDto) {
		const user = await this.usersService.findUserByEmail(email);
		if (!user) {
			throw new UnauthorizedException(authErrors.USER_NOT_FOUND_ERROR);
		}

		console.log(user);

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(authErrors.USER_NOT_FOUND_ERROR);
		}

		return { id: user._id };
	}

	async login(id: string) {
		const payload = { id };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}