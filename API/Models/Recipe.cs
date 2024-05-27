using System.ComponentModel.DataAnnotations;

namespace API.Models
{
  public class Recipe 
  {
    public int Id {get; set;}
    [Required]
    public string Name {get; set;} = string.Empty;
    public string Ingredients {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    public int? Minutes {get; set;}
  }
}