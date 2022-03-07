import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'We could not find any recipes! Please try another query.';
  _message = '';

  _generatePreviewMarkup(recipe) {
    return `
    <li class="preview">
    <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
        </div>
    </a>
    </li>
    `;
  }

  _generateMarkup() {
    const recipes = this._data;
    console.log(recipes);
    return recipes.reduce((recipeList, recipe) => {
      return recipeList + this._generatePreviewMarkup(recipe);
    }, '');
  }
}

export default new ResultsView();
