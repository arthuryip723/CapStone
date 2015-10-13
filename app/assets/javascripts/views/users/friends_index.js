YourReads.Views.FriendsIndex = Backbone.View.extend({
  template: JST['friends/index'],
  events: {

  },

  initialize: function () {
    this.listenTo(this.collection, 'sync update', this.render);
  },

  render: function () {
    this.$el.html(this.template({friends: this.collection}));
    return this;
  }
});
