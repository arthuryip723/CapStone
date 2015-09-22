YourReads.Models.Book = Backbone.Model.extend({
  urlRoot: '/api/books',
  author: function () {
    if (!this._author) {
      this._author = new YourReads.Models.Author();
    }
    return this._author;
  },
  reviews: function () {
    if (!this._reviews) {
      this._reviews = new YourReads.Collections.Reviews();
    }
    return this._reviews;
  },
  currentUserReview: function () {
    if (!this._currentUserReview) {
      this._currentUserReview = new YourReads.Models.Review({book_id: this.get('id')});
    }
    return this._currentUserReview;
  },
  // currentUserRating: function () {
  //   if (!this._currentUserRating) {
  //     this._currentUserRating = new YourReads.Models.Rating();
  //   }
  //   return this._currentUserRating;
  // },
  parse: function (response) {
    // alert("parsing book");
    if (response.author) {
      this.author().set(response.author);
      // console.log(this.author());
      delete response.comments;
    }
    if (response.reviews) {
      this.reviews().set(response.reviews, {parse: true});
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
