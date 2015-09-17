YouReads.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    var reviews = this.model.reviews();
    var reviewsIndex = new YouReads.Views.ReviewsIndex({collection: reviews});
    var currentUserReview = this.model.currentUserReview();
    var reviewForm = new YouReads.Views.ReviewForm({
      model: currentUserReview,
      collection: reviews
    });
    // var rating = new YouReads.Models.Rating({book_id: this.model.get('id')});
    // var currentUserRating = this.model.currentUserRating();
    // var ratingForm = new YouReads.Views.RatingForm({
    //   model: currentUserRating
    // });
    this.addSubview('#reviews-index', reviewsIndex);
    this.addSubview('#review-form', reviewForm);
    // this.addSubview('#rating-form', ratingForm);
  },
  render: function () {
    // debugger
    this.$el.html(this.template({book: this.model}));
    this.attachSubviews();
    return this;
  }
});
