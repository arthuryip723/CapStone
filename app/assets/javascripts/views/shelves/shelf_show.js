YourReads.Views.ShelfShow = Backbone.View.extend({
  template: JST['shelves/show'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    // alert('here')
    this.$el.html(this.template({shelf: this.model}));
    // console.log(this.model)
    return this;
  }
});
