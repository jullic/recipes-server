import { AddFavoritDto } from './dto/add-favorite.dto';
import { IRecipeQuery } from '../interfaces/recipe-query.interface';
import { userId } from './../auth/decorators/user-id.decorator';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RecipesService } from './recipes.service';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
	constructor(
		private readonly recipesService: RecipesService,
	) { }


	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post()
	async createRecipe(@Body() dto: CreateRecipeDto, @userId() userId: string) {
		return await this.recipesService.createRecipe(userId, dto);
	}

	@Get()
	async getAllRecipes(@Query() query: IRecipeQuery) {
		return await this.recipesService.getRecipes(query);
	}

	@Get(':id')
	async getOneRecipe(@Param('id') id: string) {
		return await this.recipesService.getOneRecipe(id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateRecipe(@Param('id') id: string, @Body() dto: UpdateRecipeDto, @userId() userId: string) {
		return await this.recipesService.updateRecipe(userId, id, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteRecipe(@Param('id') id: string, @userId() userId: string) {
		return await this.recipesService.deleteRecipe(userId, id);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('favorite')
	async addRecipeToFavorite(@userId() userId: string, @Body() { recipeId }: AddFavoritDto) {
		return this.recipesService.addRecipeToFavorite(userId, recipeId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('favorite/:id')
	async removeRecipeFromFavorite(@Param(':id') id: string, @userId() userId: string) {
		return await this.recipesService.removeRecipeFromFavorite(userId, id);
	}
}
