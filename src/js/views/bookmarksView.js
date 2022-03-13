import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    const bookmarks = this._data;
    
    return bookmarks.reduce((bookmarkList, bookmark) => {
      return bookmarkList + previewView.render(bookmark,false);
    }, '');
  }
}

export default new BookmarksView();
