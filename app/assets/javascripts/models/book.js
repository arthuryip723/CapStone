YouReads.Models.Book = Backbone.Model.extend({
  urlRoot: '/api/books',
  author: function () {
    if (!this._author) {
      this._author = new YouReads.Models.Author();
    }
    return this._author;
  },
  reviews: function () {
    if (!this._reviews) {
      this._reviews = new YouReads.Collections.Reviews();
    }
    return this._reviews;
  },
  currentUserReview: function () {
    if (!this._currentUserReview) {
      this._currentUserReview = new YouReads.Models.Review({book_id: this.get('id')});
    }
    return this._currentUserReview;
  },
  // currentUserRating: function () {
  //   if (!this._currentUserRating) {
  //     this._currentUserRating = new YouReads.Models.Rating();
  //   }
  //   return this._currentUserRating;
  // },
  parse: function (response) {
    if (response.author) {
      this.author().set(response.author);
      // console.log(this.author());
      delete response.comments;
    }
    if (response.reviews) {
      this.reviews().set(response.reviews);
      delete response.reviews;
    }
    if (response.current_user_review) {
      this.currentUserReview().set(response.current_user_review);
      delete response.current_user_review;
    }
    // if (response.current_user_rating) {
    //   this.currentUserRating().set(response.current_user_rating);
    //   delete response.current_user_rating;
    // }
    return response;
  }
});
