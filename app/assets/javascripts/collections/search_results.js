YourReads.Collections.SearchResults = Backbone.Collection.extend({
  url: '/api/search',
  parse: function (resp) {
    if (resp.total_count) {
      this.total_count = resp.total_count;
    }
  },
  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;

    return new YourReads.Model[type](attrs);
  }
});
