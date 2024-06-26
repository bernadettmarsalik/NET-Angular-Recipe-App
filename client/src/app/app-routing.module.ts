import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path:'', component: HeaderComponent},
  {path:'recipes', component: RecipesComponent},
  {path:'recipes/:id', component: RecipeFormComponent},
  {path:'recipes/add', component: RecipeFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
