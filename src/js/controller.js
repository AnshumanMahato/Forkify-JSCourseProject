//jshint esversion:8
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

console.log("Built");

// https://forkify-api.herokuapp.com/v2
// api key : 4cf4ee42-6ec3-45a9-bf25-940ad9eb0083

///////////////////////////////////////


const showRecipe = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');

    const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} ${res.status}`);

    let {recipe} = data.data;
    recipe = {
      id : recipe.id,
      title : recipe.title,
      publisher : recipe.publisher,
      sourceUrl : recipe.source_url,
      image : recipe.image_url,
      servings : recipe.servings,
      cookingTime : recipe.cooking_time,
      ingredients : recipe.ingredients
    };
    console.log(recipe);
  } catch (error) {
      alert(error);
  }
};

showRecipe();