YouReads.Collections.Reviews = Backbone.Collection.extend({
  model: YouReads.Models.Review,
  url: '/api/reviews'
});
