YourReads.Views.BooksIndex = Backbone.View.extend({
  template: JST['books/index'],
  tagName: 'ul',
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({books: this.collection}));
    return this;
  }
  // Need to use composite view here to add book list-item into the view
});
