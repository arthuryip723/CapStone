YourReads.Models.Author = Backbone.Model.extend({
  urlRoot: '/api/authors',
  books: function () {
    if (!this._books) {
      this._books = new YourReads.Collections.Books();
    }
    return this._books;
  },
  parse: function (response) {
    // alert('parsing author');
    if (response.books) {
      this.books().set(response.books, {parse: true});
      delete response.books;
    }
    return response;
  }
});
