using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  //   api/recipes
  public class RecipesController : ControllerBase
  {
    private readonly AppDbContext _context;
    public RecipesController(AppDbContext context)
    {
      _context = context;
    }

// GET METHOD
    [HttpGet]
   
   public async Task<IEnumerable<Recipe>> GetRecipes()
   {
    var recipes = await _context.Recipes.AsNoTracking().ToListAsync();
    return recipes;
   }

// POST 
[HttpPost]
public async Task<IActionResult> Create(Recipe recipe)
{
  if(!ModelState.IsValid)
  {
    BadRequest(ModelState);
  }
  await _context.AddAsync(recipe);
  var result = await _context.SaveChangesAsync();
  if(result > 0)
  {
    return Ok();
  }
  return BadRequest();
}

// GET by ID
[HttpGet("{id:int}")]
public async Task<ActionResult<Recipe>> GetRecipe(int id)
{
  var recipe = await _context.Recipes.FindAsync(id);
  if(recipe is null)
  {
    return NotFound();
  }
  return Ok(recipe);
}

// DELETE
[HttpDelete("{id:int}")]
public async Task<IActionResult> Delete(int id) 
{
  var recipe = await _context.Recipes.FindAsync(id);
  if(recipe is null) 
  {
    return NotFound();
  }
  _context.Remove(recipe);
  var result = await _context.SaveChangesAsync() ;
  if(result > 0)
  {
    return Ok("Recipe deleted successfully");
  }
  return BadRequest("Unable to delete recipe.");
}

// EDIT RECIPE
[HttpPut("{id:int}")]
// api/recipes/1
public async Task<IActionResult> EditRecipe(int id, Recipe recipe)
{
  var recipeFromDb = await _context.Recipes.FindAsync(id);
  if(recipeFromDb is null) 
  {
    return BadRequest("Recipe not found");
  }
  recipeFromDb.Name = recipe.Name;
  recipeFromDb.Ingredients = recipe.Ingredients;
  recipeFromDb.Description = recipe.Description;
  recipeFromDb.Minutes = recipe.Minutes;

  var result = await _context.SaveChangesAsync();
  if(result > 0)
  {
    return Ok("Recipe updated succesfully.");
  }
  return BadRequest("Unable to edit recipe");

}

  }
}