import { Time, Ingridient, Step } from '../../classes/recipe.classes';
import { ArrayMinSize, IsArray, IsInstance, IsNumber, IsObject, IsString, IsUrl, Min, MinLength, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseReacipeDto {

	@IsString()
	@MinLength(2)
	readonly name: string;

	@IsString()
	// @IsUrl()
	readonly img: string;

	@IsObject({ each: true, always: true })
	@ValidateNested({ each: true })
	@Type(() => Time, {})
	@IsInstance(Time)
	readonly time: Time;

	@IsNumber()
	@Min(1)
	readonly kcal: number;

	@IsArray({})
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => Ingridient, {})
	readonly ingridients: Ingridient[];

	@IsNumber()
	@Min(1)
	readonly portions: number;

	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => Step, {})
	readonly steps: Step[];
}
