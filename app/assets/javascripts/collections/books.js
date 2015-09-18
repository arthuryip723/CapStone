YourReads.Collections.Books = Backbone.Collection.extend({
  model: YourReads.Models.Book,
  url: '/api/books',
  getOrFetch: function (id) {
    var model = this.get(id);
    var that = this;
    if (model) {
      model.fetch();
    } else {
      model = new YourReads.Models.Book({id: id});
      this.add(model)
      model.fetch({
        error: function (model) {
          that.remove(model);
        }
      });
    }
    return model;
  }
});
