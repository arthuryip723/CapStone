YourReads.Views.UserShow = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
    // alert("here")
  },

  events: {
    // "submit form": "addFriend"
    "click .add-friend": "addFriend"
    // "button click": "addFriend"
  },

  template: JST['users/show'],

  addFriend: function (event) {
    // alert("here");
    // var $form = $(event.currentTarget);
    var friendship = new YourReads.Models.Friendship({
      to_id: this.model.get("id"),
      from_id: YourReads.currentUser.get("id")
    })

    friendship.save({}, {
      success: function () {
        alert("Successfully followed");
      },
      error: function () {
        console.log("error");
      }
    });
  },

  render: function () {
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  }
});
