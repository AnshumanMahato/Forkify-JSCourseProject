import View from "./View.js";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message= "Recipe Uploaded Successfully :)"

    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');

    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    toggleWindowState() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerOpen() {
        this._btnOpen.addEventListener('click',this.toggleWindowState.bind(this));
    }

    _addHandlerClose() {
        this._btnClose.addEventListener('click',this.toggleWindowState.bind(this));
        this._overlay.addEventListener('click',this.toggleWindowState.bind(this));
    }

    addHandlerSubmit(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const rawData = [...new FormData(this)];
            const data = Object.fromEntries(rawData);

            handler(data);
        })
    }

    constructor() {
        super();
        this._addHandlerClose();
        this._addHandlerOpen();
    }

}

export default new AddRecipeView();