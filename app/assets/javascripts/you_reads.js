window.YourReads = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var books = new YourReads.Collections.Books();
    new YourReads.Routers.Router({
      $rootEl: $('#main'),
      books: books
    });
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   YourReads.initialize();
// });
