YourReads.Views.ReviewsIndex = Backbone.View.extend({
  template: JST['reviews/index'],
  // tagName: 'ul',
  initialize: function () {
    // The change event is for model, while update is for collection
    this.listenTo(this.collection, 'update', this.render);
  },
  render: function () {
    // debugger
    this.$el.html(this.template({reviews: this.collection}));
    return this;
  }
});
