import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	userId: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true })
	recipeId: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);