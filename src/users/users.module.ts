import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [UsersService],
	exports: [
		UsersService,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	]
})
export class UsersModule { }


