YourReads.Views.BookShow = Backbone.CompositeView.extend({
  template: JST['books/show'],
  className: 'book-show',
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    var reviews = this.model.reviews();
    var reviewsIndex = new YourReads.Views.ReviewsIndex({collection: reviews});
    var currentUserReview = this.model.currentUserReview();
    // var reviewForm = new YourReads.Views.ReviewForm({
    //   model: currentUserReview,
    //   collection: reviews
    // });
    var currentUserReviewView = new YourReads.Views.CurrentUserReview({
      model: currentUserReview
    });

    // var rating = new YourReads.Models.Rating({book_id: this.model.get('id')});
    // var currentUserRating = this.model.currentUserRating();
    // var ratingForm = new YourReads.Views.RatingForm({
    //   model: currentUserRating
    // });
    this.addSubview('#reviews-index', reviewsIndex);
    this.addSubview('#current-user-review', currentUserReviewView);
    // this.addSubview('#review-form', reviewForm);
    // this.addSubview('#rating-form', ratingForm);
  },
  render: function () {
    // debugger
    this.$el.html(this.template({book: this.model}));
    this.attachSubviews();
    return this;
  }
});
