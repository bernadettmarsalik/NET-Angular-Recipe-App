import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeFormComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [provideHttpClient(), Router, HttpClient,   provideAnimations(), 
  provideToastr(),  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
