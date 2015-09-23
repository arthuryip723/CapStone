YourReads.Views.ShelfDetail = Backbone.View.extend({
  template: JST['shelves/detail'],
  className: 'just-for-test',
  initialize: function () {
    // debugger
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'update', this.render);
  },
  events: {
    'change select': 'moveToShelf'
  },
  moveToShelf: function (event) {
    var $select = $(event.currentTarget);
    // console.log($select.data('book-id'));
    // get the shelf the model is in
    // var shelf =
    var fromShelf = this.collection.get($select.data('shelf-id'));
    var shelving = fromShelf.shelvings().get($select.data('shelving-id'));
    var toShelfId = $select.val();
    var toShelf = this.collection.get(toShelfId);
    var that = this
    shelving.save({shelf_id: toShelfId}, {
      success: function (model) {
        fromShelf.shelvings().remove(model);
        toShelf.shelvings().add(model);
        that.collection.trigger('update', that.collection);
        // console.log('shelf changed');
      }
    });
  },
  render: function () {
    // var template = null;
    if (this.model) {
      this.$el.html(this.template({
        shelf: this.model,
        // books: this.model.books(),
        shelvings: this.model.shelvings(),
        shelves: this.collection
      }));
    } else{
      this.$el.html(this.template({
        shelf: null,
        // books: this.collection.books(),
        shelvings: this.collection.shelvings(),
        shelves: this.collection
      }));
    }
    // this.$el.html(this.template({shelf: this.model, books: this.collection}));
    // console.log(this.model)
    return this;
  }
});
