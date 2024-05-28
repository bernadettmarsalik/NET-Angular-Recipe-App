import { Component,  OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;

  recipeService = inject(RecipeService);

 ngOnInit(): void {
  this.loadRecipes();
}

loadRecipes() {
  this.recipes$ = this.recipeService.getRecipes();
}


}
