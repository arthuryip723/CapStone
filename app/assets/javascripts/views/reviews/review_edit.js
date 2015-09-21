YourReads.Views.ReviewEdit = Backbone.CompositeView.extend({
  template: JST['reviews/edit'],
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    var reviewFormView = new YourReads.Views.ReviewForm({
      model: this.model.currentUserReview(),
      collection: this.model.reviews()
    });
    this.addSubview('#review-form', reviewFormView);
  },
  render: function () {
    this.$el.html(this.template({book: this.model}));
    this.attachSubviews();
    return this;
  }
});
