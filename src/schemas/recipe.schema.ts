import { Time, Ingridient, Step } from './../classes/recipe.classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
	@Prop({ type: String, required: true, unique: false })
	name: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false })
	author: string;

	@Prop({ type: String, required: false, unique: false })
	img: string;

	@Prop({ type: Time, required: true, unique: false })
	time: Time;

	@Prop({ type: Number, required: true, unique: false })
	kcal: number;

	@Prop({ type: Array, required: true, unique: false, default: [] })
	ingridients: Ingridient[];

	@Prop({ type: Number, required: true, unique: false })
	portions: number;

	@Prop({ type: Array, required: true, unique: false, default: [] })
	steps: Step[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);