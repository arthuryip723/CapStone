YouReads.Views.AuthorForm = Backbone.View.extend({
  template: JST['authors/form'],
  tagName: 'form',
  events: {
    'click button': 'submit',
  },
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({author: this.model}));
    return this;
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
    });
  }

});
