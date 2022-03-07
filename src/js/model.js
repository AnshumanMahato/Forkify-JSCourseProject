//jshint esversion:8
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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
  };
};

export const loadSearchResults = async function (query) {
  state.search.query = query;

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
  // Throw an error if there are no recipies
};
