import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errMessage) {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div> 
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data,render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if(!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    /**
     * This functions updates only the nodes in the DOM which have changed
     */

    this._data = data;

    // Generating the new markup as per the updated data
    const newMarkup = this._generateMarkup();

    //This creates an unrendered DOM structure which which can me used to compare with the current DOM nodes and test for change
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    //Getting arrays of both new DOM elements as welll as current ones.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      if (!newEl.isEqualNode(currEl)) {
        //Updating all the attributes of the changed element
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );

        //Checking if the element has any text and updating if found true
        if (newEl.firstChild?.nodeValue.trim() !== '')

          /*If the element has text in it then the first child node will be a text node. 
          Thus the node value of the first child node will be the text it contains.
          But, this might also trigger if the first child is actually an element but 
          there are few spaces before it. Hence, we trim it and then check if it is not 
          an empty string. If it is not an empty dtring then it will be the text in this case*/
          
          currEl.textContent = newEl.textContent;
      }
    });
  }
}
