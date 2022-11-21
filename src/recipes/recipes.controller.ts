import { AddFavoritDto } from './dto/add-favorite.dto';
import { IRecipeQuery } from '../interfaces/recipe-query.interface';
import { userId } from './../auth/decorators/user-id.decorator';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
		console.log(dto);
		return await this.recipesService.createRecipe(userId, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('user')
	async getUserRecipes(@userId() userId: string) {
		return await this.recipesService.getUserRecipes(userId);
	}

	@Get('pages')
	async getPages() {
		return await this.recipesService.getPages();
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
	@UsePipes(new ValidationPipe())
	@Post('favorite')
	async addRecipeToFavorite(@userId() userId: string, @Body() { recipeId }: AddFavoritDto) {
		return this.recipesService.addRecipeToFavorite(userId, recipeId);
	}


	@UseGuards(JwtAuthGuard)
	@Get('favorite/user')
	async getUserFavorites(@userId() userId: string) {
		return this.recipesService.getUserFavorites(userId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('favorite')
	async removeRecipeFromFavorite(@userId() userId: string, @Body() body: { recipeId: string }) {
		return await this.recipesService.removeRecipeFromFavorite(userId, body.recipeId);
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Get('favorite/:id')
	async getOneFavoriteRecipe(@Param('id') recipeId: string, @userId() userId: string) {
		return this.recipesService.getOneFavoriteRecipe(userId, recipeId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteRecipe(@Param('id') id: string, @userId() userId: string) {
		return await this.recipesService.deleteRecipe(userId, id);
	}
}
