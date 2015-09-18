YourReads.Views.ShelvesIndex = Backbone.View.extend({
  template: JST['shelves/index'],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({shelves: this.collection}));
    return this;
  }
});
