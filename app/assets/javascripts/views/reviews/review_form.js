YourReads.Views.ReviewForm = Backbone.View.extend({
  template: JST['reviews/form'],
  tagName: 'form',
  className: 'review-form-view',
  events: {
    'click button': 'submit'
  },
  initialize: function (options) {
    this.book = options.book;
    // The change event is for model, while update is for collection
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
    // alert('here')
    // debugger
    this.$el.html(this.template({review: this.model}));
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;
    this.model.save(attrs, {
      success: function (model) {
        that.collection.add(model, {merge: true});
        Backbone.history.navigate('#/books/' + model.get('book_id'), {trigger: true});
      }
    });
  }
});
