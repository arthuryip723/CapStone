YourReads.Collections.Shelves = Backbone.Collection.extend({
  url: '/api/shelves',
  model: YourReads.Models.Shelf,
  // books: function () {
  //   if (!this._books) {
  //     this._books = new YourReads.Collections.Books();
  //   }
  //   this._books.reset();
  //   that = this;
  //   this.each(function (shelf) {
  //     that._books.add(shelf.books().models);
  //   });
  //   return this._books;
  // },
  books: function () {
    books = new YourReads.Collections.Books();
    this.each(function (shelf) {
      books.add(shelf.books().models, {merge: true});
    });
    return books;
  },
  getOrFetch: function(id) {
    var collection = this;
    var widget = collection.get(id);

    if (widget) {
      widget.fetch();
    } else {
      widget = new collection.model({ id: id });
      collection.add(widget);
      widget.fetch({
        error: function () { collection.remove(widget); }
      });
    }

    return widget;
  },
  // books: function () {
  //   if (!this._books) {
  //     this._books = new YourReads.Collections.Books();
  //   }
  //   return this._books;
  // },
  // parse: function (response) {
  //   that = this;
  //   // debugger;
  //   response.forEach(function (shelf) {
  //     if(shelf.books) {
  //       that.books().add(shelf.books, {merge: true});
  //     }
  //   });
  //   return response;
  // }
});
