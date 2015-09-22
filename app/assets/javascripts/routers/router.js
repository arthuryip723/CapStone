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
    'shelves/:id': 'shelfDetail'
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

  authorShow: function (id) {
    var author = new YourReads.Models.Author({id: id});
    author.fetch();
    var view = new YourReads.Views.AuthorShow({
      model: author
    });
    this._swapView(view);
  },

  reviewNew: function (bookId) {
    // var book = this.books.getOrFetch(bookId);
    var review = new YourReads.Models.Review({bookId: bookId});
    var view = new YourReads.Views.ReviewForm({model: review});
    this._swapView(view);
  },

  shelvesIndex: function (callback) {
    var shelves = new YourReads.Collections.Shelves();
    var view = new YourReads.Views.ShelvesIndex({collection: shelves, callback: callback});
    this._shelveIndex = view;
    shelves.fetch();
    this._swapView(view);
  },

  shelfDetail: function (id) {
    if (this._shelveIndex === undefined) {
      this.shelvesIndex(this.shelfDetail.bind(this, id));
      return;
    }
    // alert('shelfdetail')
    var shelf = new YourReads.Models.Shelf({id: id});
    var view = new YourReads.Views.ShelfDetail({model: shelf});
    shelf.fetch();
    // this._swapView(view);
    // debugger
    $('.shelf-detail').html(view.render().$el);
    // debugger
    // $('.shelf-detail').html("hello");
    // debugger
    // $('#main').append(view.$el);
    // console.log(view.$el);
  },

  reviewEdit: function (bookId) {
    var book = this.books.getOrFetch(bookId);
    var view = new YourReads.Views.ReviewEdit({model: book});
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});
