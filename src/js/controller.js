//jshint esversion:8
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

console.log('Built');

// https://forkify-api.herokuapp.com/v2
// api key : 4cf4ee42-6ec3-45a9-bf25-940ad9eb0083

///////////////////////////////////////

const showRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);
    if(!id) return;

    recipeView.renderSpinner();
    
    // Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (error) {
    alert(error);
  }
};

['hashchange','load'].forEach(ev => window.addEventListener(ev,showRecipe));

if (module.hot) {
  module.hot.accept(() => location.reload());
}
