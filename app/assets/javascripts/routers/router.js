YouReads.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'books/new': 'newBook',
    'books/:id': 'showBook',
    'authors/new': 'newAuthor',
    'books/:bookId/reviews/new': 'newReview'
  },
  initialize: function (options) {
    this.books = options.books;
    this.$rootEl = options.$rootEl;
  },
  index: function () {
    this.books.fetch();
    var view = new YouReads.Views.BooksIndex({collection: this.books});
    this._swapView(view);
  },

  newBook: function () {
    var book = new YouReads.Models.Book();
    var authors = new YouReads.Collections.Authors();
    authors.fetch();
    var view = new YouReads.Views.BookForm({
      model: book,
      collection: this.books,
      authors: authors
    });
    this._swapView(view);
  },

  showBook: function (id) {
    var book = this.books.getOrFetch(id);
    var view = new YouReads.Views.BookShow({
      model: book
    });
    this._swapView(view);
  },

  newAuthor: function () {
    var author = new YouReads.Models.Author();
    var authors = new YouReads.Collections.Authors();
    authors.fetch();
    var view = new YouReads.Views.AuthorForm({
      model: author,
      collection: authors,
    });
    this._swapView(view);
  },

  newReview: function (bookId) {
    // var book = this.books.getOrFetch(bookId);
    var review = new YouReads.Models.Review({bookId: bookId});
    var view = new YouReads.Views.ReviewForm({model: review});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});
