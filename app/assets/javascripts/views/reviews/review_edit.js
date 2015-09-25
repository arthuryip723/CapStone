YourReads.Views.ReviewEdit = Backbone.CompositeView.extend({
  template: JST['reviews/edit'],
  className: 'review-edit-view',
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    var reviewFormView = new YourReads.Views.ReviewForm({
      model: this.model.currentUserReview(),
      collection: this.model.reviews()
    });
    this.addSubview('#review-form-container', reviewFormView);
  },
  render: function () {
    this.$el.html(this.template({book: this.model}));
    this.attachSubviews();
    return this;
  }
});
