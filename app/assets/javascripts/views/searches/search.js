YourReads.Views.Search = Backbone.View.extend({
  template: JST['searches/search'],
  initialize: function () {
    this.searchResults = new YourReads.Collections.SearchResults();
    this.listenTo(this.searchResults, 'sync', this.render);
  },

  events: {
    "change .query": "search"
  },

  render: function () {
    // alert('sync');
    debugger;
    this.$el.html(this.template({results: this.searchResults}));
    return this;
  },

  search: function (event) {
    // alert('here')
    event.preventDefault();
    // this.searchResults.pageNum = 1;
    this.searchResults.query = this.$(".query").val();

    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        // page: 1
      }
    });
  },
});
