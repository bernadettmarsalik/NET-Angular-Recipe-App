import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly API_URL: string = "http://localhost:5239/api/recipes";


  constructor(private http: HttpClient) { }

// GET
getRecipes=(): Observable<Recipe[]>=>this.http.get<Recipe[]>(`${this.API_URL}`)


getRecipe(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.API_URL}/${id}`);
}

saveRecipe(recipe: Recipe): Observable<Recipe> {
  return this.http.post<Recipe>(this.API_URL, recipe);
}

updateRecipe(recipe: Recipe): Observable<Recipe> {
  return this.http.put<Recipe>(`${this.API_URL}/${recipe.id}`, recipe);
}

deleteRecipe(id: number): Observable<Object> {
  return this.http.delete<Object>(`${this.API_URL}/${id}`);
}
}


