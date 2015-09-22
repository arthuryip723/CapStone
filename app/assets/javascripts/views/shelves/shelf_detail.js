YourReads.Views.ShelfDetail = Backbone.View.extend({
  template: JST['shelves/detail'],
  className: 'just-for-test',
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    // alert('here')
    // debugger
    this.$el.html(this.template({shelf: this.model}));
    // console.log(this.model)
    return this;
  }
});
