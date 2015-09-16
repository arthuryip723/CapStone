YouReads.Models.Book = Backbone.Model.extend({
  urlRoot: '/api/books',
  author: function () {
    if (!this._author) {
      this._author = new YouReads.Models.Author();
    }
    return this._author;
  },
  reviews: function () {
    if (!this._reviews) {
      this._reviews = new YouReads.Collections.Reviews();
    }
    return this._reviews;
  },
  parse: function (response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.comments;
    }
    if (response.reviews) {
      this.reviews().set(response.reviews);
      delete response.reviews;
    }
    return response;
  }
});
