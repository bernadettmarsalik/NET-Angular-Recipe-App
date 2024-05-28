import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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


 constructor(private toastrService: ToastrService
 ) {}

 ngOnInit(): void {
   this.loadRecipes();
 }

 // Delete recipe from list
 confirmDelete(id?: number) {
   if (confirm("Are you sure you want to delete?")) {
     this.subDeleteRecipe = this.recipeService.deleteRecipe(Number(id)).subscribe({
       next: () => {
        this.toastrService.success("Recipe deleted.")
         this.loadRecipes();  // Reload the list of recipes
       },
       error: (err: any) => {
        this.toastrService.error("Error deleting recipe. Try again.");

       },
      
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