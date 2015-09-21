YourReads.Views.CurrentUserReview = Backbone.View.extend({
  template: JST['reviews/current_user'],
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
    this.$el.html(this.template({review: this.model}));
    return this;
  }
});
