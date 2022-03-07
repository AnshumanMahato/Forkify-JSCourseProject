import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

    if (error.cause === 'TIMEOUT') recipeView.renderError(error.message);
    if (error.cause === 'NOT_FOUND') recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //Get query from the search bar
    const query = searchView.getQuery();
    resultsView.renderSpinner();

    if (!query) return;

    //get serch results for the query
    await model.loadSearchResults(query);

    //render results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(error);
    resultsView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

if(module.hot){
  module.hot.accept();
}
