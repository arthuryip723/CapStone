YourReads.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',
  user: function () {
      if (!this._user) {
        this._user = new YourReads.Models.User();
      }
    return this._user;
  },
  parse: function (response) {
    // alert("parsing review")
    if (response.user) {
      this.user().set(response.user);
      delete response.comments;
    }
    return response;
  }
});
