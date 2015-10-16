YourReads.Views.SignIn = Backbone.View.extend({
  initialize: function (options) {
    this.callback = options.callback;
    this.listenTo(YourReads.currentUser, "signIn", this.signInCallback);
    // alert("here")
  },

  className: "signin-view",

  events: {
    "submit form": "submit",
    // "click demo-signin": "demoSignin"
  },

  template: JST['shared/sign_in'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  submit: function (event) {
    // alert("here")
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    YourReads.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function () {
        alert("Wrong username/password combination. Please try again!");
      }
    });
  },

  signInCallback: function (event) {
    // alert('here')
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate('', {trigger: true});
    }
  },
  // demoSignin: function (event) {
  //   event.preventDefault();
  //   var $form = $(event.currentTarget);
  //   var formData = $form.serializeJSON().user;
  //
  //   YourReads.currentUser.signIn({
  //     email: formData.email,
  //     password: formData.password,
  //     error: function () {
  //       alert("Wrong username/password combination. Please try again!");
  //     }
  //   });
  // },
});
