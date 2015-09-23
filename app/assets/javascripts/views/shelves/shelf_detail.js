YourReads.Views.ShelfDetail = Backbone.View.extend({
  template: JST['shelves/detail'],
  className: 'just-for-test',
  initialize: function () {
    // debugger
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'update', this.render);
  },
  render: function () {
    // var template = null;
    if (this.model) {
      this.$el.html(this.template({shelf: this.model, books: this.model.books()}));
    } else if (this.collection) {
      this.$el.html(this.template({shelf: null, books: this.collection.books()}));
    }
    // this.$el.html(this.template({shelf: this.model, books: this.collection}));
    // console.log(this.model)
    return this;
  }
});
