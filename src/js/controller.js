import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //Update results view and bookmarks to mark the selected on
    resultsView.render(model.loadResultsPerPage());
    bookmarksView.update(model.state.bookmarks);

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
    resultsView.render(model.loadResultsPerPage());

    //render Page buttons
    paginationView.render(model.state.search);
    
  } catch (error) {
    console.error(error);
    resultsView.renderError();
  }
};

const controlPagination = function(gotoPage) {
  //render results
  resultsView.render(model.loadResultsPerPage(gotoPage));

  //render Page buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update servings in state
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  //Check for bookmark state and proceed accordingly
  if(!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  //Update the view
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = function(newRecipe) {
  console.log(newRecipe);
}

const init = function () {
  model.initState();
  bookmarksView.render(model.state.bookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerSubmit(controlAddRecipe);

};

init();
