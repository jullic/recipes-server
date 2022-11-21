import { UsersService } from './users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { userId } from 'src/auth/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@UseGuards(JwtAuthGuard)
	@Get()
	async findUserById(@userId() userId: string) {
		return await this.usersService.findUserById(userId);
	}
}
