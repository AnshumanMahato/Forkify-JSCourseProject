import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

console.log('Built');

// https://forkify-api.herokuapp.com/v2
// api key : 4cf4ee42-6ec3-45a9-bf25-940ad9eb0083

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    if(error.cause === 'TIMEOUT')
      recipeView.renderError(error.message);
    if(error.cause === 'NOT_FOUND')
      recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
