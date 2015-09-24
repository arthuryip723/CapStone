YourReads.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'books/new': 'bookNew',
    'books/:id': 'bookShow',
    'authors/new': 'authorNew',
    'authors/:id': 'authorShow',
    'books/:bookId/reviews/new': 'reviewNew',
    'books/:bookId/reviews/edit': 'reviewEdit',
    'shelves': 'shelvesIndex',
    'shelves/all': 'shelfAll',
    'shelves/:id': 'shelfDetail',
    'search': 'search',
  },
  initialize: function (options) {
    this.books = options.books;
    this.$rootEl = options.$rootEl;
    this._shelves = new YourReads.Collections.Shelves();
    this._shelves.fetch();
  },
  index: function () {
    this._clearShelves();
    this.books.fetch();
    var view = new YourReads.Views.BooksIndex({collection: this.books, shelves: this._shelves});
    this._swapView(view);
  },

  bookNew: function () {
    this._clearShelves();
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
    this._clearShelves();
    var book = this.books.getOrFetch(id);
    var view = new YourReads.Views.BookShow({
      model: book
    });
    this._swapView(view);
  },

  authorNew: function () {
    this._clearShelves();
    var author = new YourReads.Models.Author();
    var authors = new YourReads.Collections.Authors();
    authors.fetch();
    var view = new YourReads.Views.AuthorForm({
      model: author,
      collection: authors,
    });
    this._swapView(view);
  },

  authorShow: function (id) {
    this._clearShelves();
    var author = new YourReads.Models.Author({id: id});
    author.fetch();
    var view = new YourReads.Views.AuthorShow({
      model: author
    });
    this._swapView(view);
  },

  reviewNew: function (bookId) {
    this._clearShelves();
    // var book = this.books.getOrFetch(bookId);
    var review = new YourReads.Models.Review({bookId: bookId});
    var view = new YourReads.Views.ReviewForm({model: review});
    this._swapView(view);
  },

  shelvesIndex: function (callback) {
    var shelves = new YourReads.Collections.Shelves();
    var view = new YourReads.Views.ShelvesIndex({collection: shelves, callback: callback});
    this._shelves = shelves;
    this._shelveIndex = view;
    shelves.fetch();
    this._swapView(view);
  },

  shelfDetail: function (id) {
    if (this._shelveIndex === undefined) {
      this.shelvesIndex(this.shelfDetail.bind(this, id));
      return;
    }
    // var shelf = new YourReads.Models.Shelf({id: id});
    var shelf = this._shelves.getOrFetch(id);
    var view = new YourReads.Views.ShelfDetail({model: shelf, collection: this._shelves});
    this._shelveIndex.removeAllSubviews();
    this._shelveIndex.addSubview('.shelf-detail-container', view);
    // shelf.fetch();
  },

  shelfAll: function () {
    if (this._shelveIndex === undefined) {
      this.shelvesIndex();
      return;
    }
    var view = new YourReads.Views.ShelfDetail({collection: this._shelves});
    this._shelveIndex.removeAllSubviews();
    this._shelveIndex.addSubview('.shelf-detail-container', view);

  },

  reviewEdit: function (bookId) {
    this._clearShelves();
    var book = this.books.getOrFetch(bookId);
    var view = new YourReads.Views.ReviewEdit({model: book});
    this._swapView(view);
  },

  search: function () {
    this._clearShelves();
    var view = new YourReads.Views.Search();
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  },
  _clearShelves: function () {
    this._shelveIndex = undefined;
  }
});
