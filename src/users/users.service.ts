import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) { }

	async createUser(data: User) {
		const newUser = new this.userModel(data);
		return await newUser.save();
	}

	async updateUser(id: string, data: User) {
		return await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();;
	}

	async deleteUser(id: string) {
		return await this.userModel.findByIdAndDelete(id).exec();
	}

	async findUserByEmail(email: string) {
		return await this.userModel.findOne({ email }).exec();
	}

	async findUserById(id: string) {
		return await this.userModel.findById(id).exec();
	}
}
