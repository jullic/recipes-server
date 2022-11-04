import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe, RecipeSchema } from 'src/schemas/recipe.schema';
import { Favorite, FavoriteSchema } from 'src/schemas/favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }, { name: Favorite.name, schema: FavoriteSchema }])
  ],
  providers: [RecipesService],
  controllers: [RecipesController]
})
export class RecipesModule { }
