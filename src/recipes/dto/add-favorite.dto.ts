import { IsString } from 'class-validator';

export class AddFavoritDto {
	@IsString()
	recipeId: string;
}