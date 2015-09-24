YourReads.Collections.SearchResults = Backbone.Collection.extend({
  url: '/api/search',
  parse: function (resp) {
    if (resp.total_count) {
      this.total_count = resp.total_count;
    }
    return resp.results;
  },
  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;

    // var model = new YourReads.Models[type](attrs);
    var model = new YourReads.Models[type]();
    model.set(model.parse(attrs));
    return model;
  }
});
