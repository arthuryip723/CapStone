YourReads.Collections.Friends = Backbone.Collection.extend({
  url: "/api/users/friends",
  model: YourReads.Models.User
});
