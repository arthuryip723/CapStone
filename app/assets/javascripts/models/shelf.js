YourReads.Models.Shelf = Backbone.Model.extend({
  urlRoot: '/api/shelves',
  // books: function () {
  //   if (!this._books) {
  //     this._books = new YourReads.Collections.Reviews();
  //   }
  //   return this._books;
  // },
  // parse: function (response) {
  //   if (response.books) {
  //     this.books().set(response.books);
  //     delete response.books;
  //   }
  //   return response;
  // }
  shelvings: function () {
    if (!this._shelvings) {
      this._shelvings = new YourReads.Collections.Shelvings();
    }
    return this._shelvings;
  },
  books: function () {
    var books = new YourReads.Collections.Books();
    this.shelvings().each(function (shelving) {
      books.add(shelving.book());
    });
    return books;
  },
  parse: function (response) {
    if (response.shelvings) {
      this.shelvings().set(response.shelvings, {parse: true});
      delete response.shelvings;
    }
    return response;
  }
});
