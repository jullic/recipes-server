import { recipeErrors } from './recipes.constants';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { IRecipeQuery } from '../interfaces/recipe-query.interface';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Favorite, FavoriteDocument } from './../schemas/favorite.schema';
import { RecipeDocument } from './../schemas/recipe.schema';
import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from 'src/schemas/recipe.schema';

@Injectable()
export class RecipesService {
	constructor(
		@InjectModel(Recipe.name) private readonly recipeModel: Model<RecipeDocument>,
		@InjectModel(Favorite.name) private readonly favoriteModel: Model<FavoriteDocument>,
	) { }

	async createRecipe(id: string, dto: CreateRecipeDto) {
		const recipe = new this.recipeModel({
			...dto,
			author: id
		});
		return await recipe.save();
	}

	async getRecipes(query: IRecipeQuery) {
		const name = query.recipeName ? new RegExp(query.recipeName + '(.*)', 'i') : /(.*)/;

		return await this.recipeModel.aggregate([
			{
				$match: {
					name
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$skip: query.limit && query.page ? (Number(query.page) - 1) * Number(query.limit) : 0
			},
			{
				$limit: query.limit ? Number(query.limit) : 6
			}
		]).exec();
	}

	async getOneRecipe(id: string) {
		return await this.recipeModel.findById(id).exec();
	}

	async checkRecipe(userId: string, recipeId: string) {
		const recipe = await this.recipeModel.findById(recipeId).exec();
		if (!recipe) {
			throw new NotFoundException(recipeErrors.RECIPE_NOT_FOUND_ERROR);
		}
		if (recipe.author !== userId) {
			throw new NotAcceptableException(recipeErrors.RECIPE_NOT_ACCEPTABLE_ERROR);
		}
	}

	async updateRecipe(userId: string, recipeId: string, dto: UpdateRecipeDto) {
		await this.checkRecipe(userId, recipeId);
		await this.recipeModel.findByIdAndUpdate(recipeId, dto).exec();
		return this.recipeModel.findById(recipeId).exec();
	}

	async deleteRecipe(userId: string, recipeId: string) {
		await this.checkRecipe(userId, recipeId);
		return await this.recipeModel.findByIdAndDelete(recipeId, { new: true });
	}

	async addRecipeToFavorite(userId: string, recipeId: string) {

		const favorite = await this.favoriteModel.findOne({ userId, recipeId });
		if (favorite) {
			throw new BadRequestException(recipeErrors.RECIPE_NO_ACCESS);
		}

		const favoriteDoc = new this.favoriteModel({
			userId,
			recipeId
		});
		return await favoriteDoc.save();
	}

	async removeRecipeFromFavorite(userId: string, recipeId: string) {
		const favorite = await this.favoriteModel.findOne({ userId, recipeId });
		if (!favorite) {
			throw new BadRequestException(recipeErrors.RECIPE_NO_ACCESS);
		}
		return await this.favoriteModel.findByIdAndDelete(recipeId);
	}
}
