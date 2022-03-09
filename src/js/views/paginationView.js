import View from "./View.js"

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement= document.querySelector('.pagination');

    _generateMarkup() {
        
        const totalPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);
        const currPage = this._data.page;
        
        // if at first page and there are no other pages
        if(totalPages === 1)
            return '';

        // if at page 1 and there are other pages
        if(currPage === 1 )
            return `
            <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        
        // if at a page other than the first and last
        if(currPage > 1 && currPage < totalPages)
            return `
            <button data-goto = "${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        
        // if at last page
        if(currPage === totalPages )
            return `
            <button data-goto = "${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
            </button>
            `;
    }

    addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn--inline');

        if(!btn) return;
        handler(+btn.dataset.goto);
      })
    }
}


export default new PaginationView();