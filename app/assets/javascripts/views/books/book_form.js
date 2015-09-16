YouReads.Views.BookForm = Backbone.View.extend({
  template: JST['books/form'],
  tagName: 'form',
  events: {
    'click button': 'submit'
  },
  initialize: function (options) {
    this.authors = options.authors;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.authors, 'sync', this.render);
  },
  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;
    this.model.save(attrs, {
      success: function (model) {
        that.collection.add(model, {merge: true});
        Backbone.history.navigate('', {trigger: true});
      }
    })
  },
  render: function () {
    this.$el.html(this.template({book: this.model, authors: this.authors}));
    return this;
  },
});
