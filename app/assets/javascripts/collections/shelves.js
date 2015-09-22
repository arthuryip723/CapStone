YourReads.Collections.Shelves = Backbone.Collection.extend({
  url: '/api/shelves',
  model: YourReads.Models.Shelf,
  books: function () {
    var books = new YourReads.Collections.Books();
    this.each(function (shelf) {
      books.add(shelf.books().models);
    });
    return books;
  }
});
