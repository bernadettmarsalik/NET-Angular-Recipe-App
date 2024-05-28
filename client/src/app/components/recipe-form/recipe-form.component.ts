import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  recipe?: Recipe;
  subRecipe?: Subscription;
  subRoute?: Subscription;
  subSaveOrUpdate?: Subscription;
constructor( private router: Router,
  private recipeService: RecipeService,
  private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      ingredients: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5000),
      ]),
      minutes: new FormControl("", [
      ]),
    });

    this.subRoute = this.activatedRoute.paramMap.subscribe((params) => {
      let readParam = params.get("id");
      if (readParam) {
        this.id = +readParam;
        this.subRecipe = this.recipeService.getRecipe(this.id).subscribe({
          next: (recipe: Recipe) => {
            this.recipe = recipe;
            this.form.patchValue(recipe);
          },
        });
      }
    });
  }

  get name() {
    return this.form.get("name");
  }

  get ingredients() {
    return this.form.get("ingredients");
  }

  get description() {
    return this.form.get("description");
  }

  get minutes() {
    return this.form.get("minutes");
  }

 

  saveRecipe() {
    if (!this.form.valid) {
      console.log("Not a valid recipe!");
      return;
    }

    const recipeToSave = this.form.value;
    const saveOrUpdate$ = this.id
      ? this.recipeService.updateRecipe({ ...recipeToSave, id: this.recipe?.id })
      : this.recipeService.saveRecipe(recipeToSave);

    this.subSaveOrUpdate = saveOrUpdate$.subscribe({
      next: (recipe: Recipe) => {
        console.log(recipe);
        this.form.reset();
        this.router.navigate(["recipes"]);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("Save recipe done!");
      },
    });
  }

  ngOnDestroy(): void {
    this.subRecipe?.unsubscribe();
    this.subRoute?.unsubscribe();
    this.subSaveOrUpdate?.unsubscribe();
  }
}
