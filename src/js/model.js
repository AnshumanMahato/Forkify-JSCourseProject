//jshint esversion:8
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  const data = await getJSON(`${API_URL}${id}`);

  let { recipe } = data.data;

  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookmarked:false,
  };

  if(state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id))
    state.recipe.bookmarked = true;
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  state.search.page = 1; //Reset to first page

  const data = await getJSON(`${API_URL}?search=${query}`);

  if (!data.data.recipes.length)
    throw new Error('No results found for this query', { cause: 'NOT_FOUND' });

  state.search.results = data.data.recipes.map(recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
    };
  });
};

export const loadResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //add to bookmark array in state
  state.bookmarks.push(recipe);

  //Update the current recipe as bookmarked
  state.recipe.bookmarked = true;
};

export const deleteBookmark = function(id) {
  //Find the index of the bookmarked recipe
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  //remove the recipe from the array
  state.bookmarks.splice(index,1);

  //Update the current recipe as not bookmarked
  state.recipe.bookmarked = false;
}
