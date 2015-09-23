YourReads.Models.Shelving = Backbone.Model.extend({
  urlRoot: '/api/shelvings',
  book: function () {
    if (!this._book) {
      this._book = new YourReads.Models.Book();
    }
    return this._book;
  },
  parse: function (response) {
    if (response.book) {
      this.book().set(response.book);
      delete response.book;
    }
    return response;
  }
});
