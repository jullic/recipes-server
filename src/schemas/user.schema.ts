import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ required: true, unique: false, type: String })
	name: string;

	@Prop({ required: true, unique: false, type: String })
	lastName: string;

	@Prop({ required: false, unique: false, type: String })
	img: string;

	@Prop({ required: true, unique: true, type: String })
	email: string;

	@Prop({ required: true, unique: false, type: String })
	passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);