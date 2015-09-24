YourReads.Views.ShelfDetail = Backbone.View.extend({
  template: JST['shelves/detail'],
  className: 'shelf-detail-view',
  initialize: function () {
    // debugger
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'update', this.render);
  },
  events: {
    'change select': 'moveToShelf',
    'change :checkbox': 'toggleShelf'
  },
  moveToShelf: function (event) {
    var $select = $(event.currentTarget);

    // var fromShelf = this.collection.get($select.data('shelf-id'));
    // var shelving = fromShelf.shelvings().get($select.data('shelving-id'));
    // var toShelfId = $select.val();
    // var toShelf = this.collection.get(toShelfId);
    // var that = this;
    // shelving.save({shelf_id: toShelfId}, {
    //   success: function (model) {
    //     fromShelf.shelvings().remove(model);
    //     toShelf.shelvings().add(model);
    //     that.collection.trigger('update', that.collection);
    //   }
    // });
    // debugger
    var that = this;
    var shelving = this.collection.defaultShelves().shelvings().findWhere({book_id: $select.data('book-id')});
    var fromShelf = this.collection.get(shelving.get('shelf_id'));
    var toShelfId = $select.val();
    var toShelf = this.collection.get(toShelfId);
    shelving.save({shelf_id: toShelfId}, {
      success: function (model) {
        fromShelf.shelvings().remove(model);
        toShelf.shelvings().add(model);
        that.collection.trigger('update', that.collection);
      }
    });
  },
  toggleShelf: function (event) {
    var that = this;
    var $checkbox = $(event.currentTarget);
    var shelfId = $checkbox.data('shelf-id')
    var shelf = this.collection.get(shelfId);
    var bookId = $checkbox.data('book-id');
    if ($checkbox.is(':checked')) {
      var shelving = new YourReads.Models.Shelving({ book_id: bookId, shelf_id: shelfId });
      shelving.save({}, {
        success: function (model) {
          // debugger
          shelf.shelvings().add(model);
          that.collection.trigger('update', that.collection);
        }
      });
    } else {
      var shelving = shelf.shelvings().findWhere({book_id: bookId});
      shelving.destroy({
        success: function (model) {
          shelf.shelvings().remove(model);
          that.collection.trigger('update', that.collection);
        }
      });
    }
  },
  render: function () {
    // var template = null;
    if (this.model) {
      // debugger
      this.$el.html(this.template({
        shelf: this.model,
        // books: this.model.books(),
        books: this.model.books(),
        shelves: this.collection
      }));
    } else{
      this.$el.html(this.template({
        shelf: null,
        // books: this.collection.books(),
        books: this.collection.books(),
        shelves: this.collection
      }));
    }
    // this.$el.html(this.template({shelf: this.model, books: this.collection}));
    // console.log(this.model)
    return this;
  }
});
