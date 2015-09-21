   YourReads.Views.AuthorShow = Backbone.View.extend({
  template: JST['authors/show'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({author: this.model}));
    return this;
  }
});
