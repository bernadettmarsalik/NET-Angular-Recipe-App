import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

 recipes$!: Observable<Recipe[]>;
 subDeleteRecipe?: Subscription;
 recipeService = inject(RecipeService);

 ngOnInit(): void {
   this.loadRecipes();
 }

 // Delete recipe from list
 confirmDelete(id?: number) {
   if (confirm("Are you sure you want to delete?")) {
     this.subDeleteRecipe = this.recipeService.deleteRecipe(Number(id)).subscribe({
       next: () => {
         console.log("Delete complete!");
         this.loadRecipes();  // Reload the list of recipes
       },
       error: (err: any) => {
         console.error("Error deleting recipe:", err);
       },
       complete: () => {
         console.log("Delete request complete");
       }
     });
   }
 }

 loadRecipes() {
   this.recipes$ = this.recipeService.getRecipes();
 }

 ngOnDestroy(): void {
   this.subDeleteRecipe?.unsubscribe();
 }
}