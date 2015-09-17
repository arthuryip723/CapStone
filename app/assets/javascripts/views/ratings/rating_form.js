YouReads.Views.RatingForm = Backbone.View.extend({
  template: JST['ratings/form'],
  tagName: 'form',
  events: {
    'click button': 'submit'
  },
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
    this.$el.html(this.template({rating: this.model}));
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;
    this.model.save(attrs, {
      success: function (model) {
        // that.collection.add(model, {merge: true});
        Backbone.history.navigate('#/books/' + model.get('book_id'), {trigger: true});
      }
    });
  }
});
