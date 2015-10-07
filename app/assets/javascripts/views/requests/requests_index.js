YourReads.Views.RequestsIndex = Backbone.View.extend({
  template: JST['requests/index'],
  events: {
    "click .accept-button": "accept",
    "click .reject-button": "reject"
  },
  initialize: function () {
    this.listenTo(this.collection, 'sync update', this.render);
  },
  render: function () {
    this.$el.html(this.template({requests: this.collection}));
    return this;
  },
  accept: function (event) {
    var $button = $(event.currentTarget);
    var id = $button.data('id')
    $.ajax({
      url: "/api/friend_requests/" + id + "/accept",
      type: "post",
      success: function (data) {
        // debugger
        alert("You guys are friends now!");
      }
    });
  },
  reject: function (event) {
    var $button = $(event.currentTarget);
    // debugger
    var id = $button.data('id')
    $.ajax({
      url: "/api/friend_requests/" + id + "/reject",
      type: "post",
      success: function (data) {
        // debugger
        alert("Request rejected!");
      }
    });
  }
});
