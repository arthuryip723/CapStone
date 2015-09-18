YourReads.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'books/new': 'bookNew',
    'books/:id': 'bookShow',
    'authors/new': 'authorNew',
    'books/:bookId/reviews/new': 'reviewNew',
    'shelves': 'shelvesIndex',
    'shelves/:id': 'shelfShow'
  },
  initialize: function (options) {
    this.books = options.books;
    this.$rootEl = options.$rootEl;
  },
  index: function () {
    this.books.fetch();
    var view = new YourReads.Views.BooksIndex({collection: this.books});
    this._swapView(view);
  },

  bookNew: function () {
    var book = new YourReads.Models.Book();
    var authors = new YourReads.Collections.Authors();
    authors.fetch();
    var view = new YourReads.Views.BookForm({
      model: book,
      collection: this.books,
      authors: authors
    });
    this._swapView(view);
  },

  bookShow: function (id) {
    var book = this.books.getOrFetch(id);
    var view = new YourReads.Views.BookShow({
      model: book
    });
    this._swapView(view);
  },

  authorNew: function () {
    var author = new YourReads.Models.Author();
    var authors = new YourReads.Collections.Authors();
    authors.fetch();
    var view = new YourReads.Views.AuthorForm({
      model: author,
      collection: authors,
    });
    this._swapView(view);
  },

  reviewNew: function (bookId) {
    // var book = this.books.getOrFetch(bookId);
    var review = new YourReads.Models.Review({bookId: bookId});
    var view = new YourReads.Views.ReviewForm({model: review});
    this._swapView(view);
  },

  shelvesIndex: function () {
    var shelves = new YourReads.Collections.Shelves();
    shelves.fetch();
    var view = new YourReads.Views.ShelvesIndex({collection: shelves});
    this._swapView(view);
  },

  shelfShow: function (id) {
    var shelf = new YourReads.Models.Shelf({id: id});
    shelf.fetch();
    var view = new YourReads.Views.ShelfShow({model: shelf});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});
