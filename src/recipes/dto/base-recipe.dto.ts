import { Time, Ingridient, Step } from '../../classes/recipe.classes';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class BaseReacipeDto {

	@IsString()
	readonly name: string;

	@IsString()
	readonly img: string;

	@IsObject()
	readonly time: Time;

	@IsNumber()
	readonly kcal: number;

	@IsArray()
	readonly ingridients: Ingridient[];

	@IsNumber()
	readonly portions: number;

	@IsArray()
	readonly steps: Step[];
}