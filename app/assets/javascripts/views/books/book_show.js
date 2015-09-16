YouReads.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    var reviews = this.model.reviews();
    var reviewsIndex = new YouReads.Views.ReviewsIndex({collection: reviews});
    this.addSubview('#reviews-index', reviewsIndex);
  },
  render: function () {
    // debugger
    this.$el.html(this.template({book: this.model}));
    this.attachSubviews();
    return this;
  }
});
