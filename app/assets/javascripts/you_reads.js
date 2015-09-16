window.YouReads = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    var books = new YouReads.Collections.Books();
    new YouReads.Routers.Router({
      $rootEl: $('#main'),
      books: books
    });
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   YouReads.initialize();
// });
