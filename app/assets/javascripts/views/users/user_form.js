YourReads.Views.UserForm = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/form'],

  events: {
    "submit form": "submit"
  },

  render: function () {
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;
    this.model.set(userData);
    // debugger
    this.model.save({}, {
      success: function () {
        YourReads.currentUser.fetch();
        Backbone.history.navigate("", { trigger: true });
      },
      error: function (data) {
        alert("Form invalid. Let the user know what went wrong.");
        console.log(data);
      }
    });

  }
});
