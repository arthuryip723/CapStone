window.YourReads = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    // this.currentUser = new YourReads.Models.CurrentUser();
    // debugger
    // this.currentUser.fetch();
    YourReads.currentUser = new YourReads.Models.CurrentUser();
    YourReads.currentUser.fetch();
    // this.header = new YourReads.Views.Header({ el: "#header"});
    YourReads.header = new YourReads.Views.Header({ el: "#header" });
    var books = new YourReads.Collections.Books();
    YourReads.router = new YourReads.Routers.Router({
      $rootEl: $('#main'),
      books: books
    });
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   YourReads.initialize();
// });
