import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'We could not find any recipes! Please try another query.';
  _message = '';

  _generateMarkup() {
    const recipes = this._data;
    
    return recipes.reduce((recipeList, recipe) => {
      return recipeList + previewView.render(recipe,false);
    }, '');
  }
}

export default new ResultsView();
