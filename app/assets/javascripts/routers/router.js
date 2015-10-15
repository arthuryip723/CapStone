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
    'users': 'usersIndex',
    'users/new': 'userNew',
    'users/:id': 'userShow',
    'session/new': 'signIn',
    'requests': 'requestsIndex',
    'friends': 'friendsIndex',
    'feeds': 'feeds'
  },
  initialize: function (options) {
    this.books = options.books;
    this.$rootEl = options.$rootEl;
    // figure out what I should do here
    this._shelves = new YourReads.Collections.Shelves();
    // this._shelves.fetch();
  },
  index: function () {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) return;
    // debugger
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
    var view = new YourReads.Views.Search({shelves: this._shelves});
    this._swapView(view);
  },

  // userNew: function () {
  //   if (!this._requireSignedOut()) return;
  //   var model = new this.collection.model();
  //   var formView = new YourReads.Views.UserForm();
  // },

  signIn: function (callback) {
    if (!this._requireSignedOut(callback)) return;
    var signInView = new YourReads.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  userNew: function () {
    if (!this._requireSignedOut()) return;
    // var model = new this.collection.model();
    var model = new YourReads.Models.User();
    var formView = new YourReads.Views.UserForm({
      model: model
    });
    this._swapView(formView);
  },

  userShow: function (id) {
    // alert("here")
    var callback = this.userShow.bind(this, id);
    if (!this._requireSignedIn(callback)) return;

    var model = new YourReads.Models.User({ id: id });
    model.fetch();
    var showView = new YourReads.Views.UserShow({
      model: model
    });
    this._swapView(showView);
  },

  requestsIndex: function () {
    // alert('here')
    var callback = this.requestsIndex.bind(this);
    if (!this._requireSignedIn(callback)) return;

    var collection = new YourReads.Collections.Requests();
    collection.fetch();
    var indexView = new YourReads.Views.RequestsIndex({
      collection: collection
    });
    this._swapView(indexView);
  },

  friendsIndex: function () {
    var callback = this.friendsIndex.bind(this);
    if (!this._requireSignedIn(callback)) return;
    var collection = new YourReads.Collections.Friends();
    collection.fetch();
    var indexView = new YourReads.Views.FriendsIndex({
      collection: collection
    });
    this._swapView(indexView);
  },

  feeds: function () {
    var callback = this.feeds.bind(this);
    if (!this._requireSignedIn(callback)) return;
    var feedsView = new YourReads.Views.Feeds({
      collection: collection
    });
    this._swapView(feedsView);
  },

  _requireSignedIn: function (callback) {
    if (!YourReads.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function (callback) {
    if (YourReads.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
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
