YourReads.Views.BookItem = Backbone.View.extend({
  template: JST['books/item'],
  // tagName: 'li',
  initialize: function () {
    this.listenTo(this.model, 'sync', render);
  },
  render: function () {
    this.$el.html(this.template({book: this.model}));
    return this;
  }
});
