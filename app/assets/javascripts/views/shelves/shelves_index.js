YourReads.Views.ShelvesIndex = Backbone.View.extend({
  template: JST['shelves/index'],
  initialize: function (options) {
    this.books = options.books
    this.listenTo(this.collection, 'sync', this.render);
    this.callback = options.callback;
  },
  render: function () {
    this.$el.html(this.template({shelves: this.collection, books: this.collection.books()}));
    this.callback && this.callback();
    return this;
  }
});
