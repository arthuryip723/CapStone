YourReads.Views.BooksIndex = Backbone.View.extend({
  template: JST['books/index'],
  tagName: 'ul',
  className: 'books-index-view',
  events: {
    'change select': 'addToShelf',
    'change :checkbox': 'toggleShelf'
  },
  initialize: function (options) {
    this.shelves = options.shelves
    // debugger
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.shelves, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({books: this.collection, shelves: this.shelves}));
    return this;
  },
  toggleShelf: function (event) {
    var that = this;
    var $checkbox = $(event.currentTarget);
    var shelfId = $checkbox.data('shelf-id')
    var shelf = this.shelves.get(shelfId);
    // debugger
    var bookId = $checkbox.data('book-id');
    if ($checkbox.is(':checked')) {
      var shelving = new YourReads.Models.Shelving({ book_id: bookId, shelf_id: shelfId });
      shelving.save({}, {
        success: function (model) {
          // debugger
          // shelf.shelvings().add(model);
          // that.collection.trigger('update', that.collection);
          alert('Successfuly added to book shelf!');
        }
      });
    } else {
      var shelving = shelf.shelvings().findWhere({book_id: bookId});
      shelving.destroy({
        success: function (model) {
          // shelf.shelvings().remove(model);
          // that.collection.trigger('update', that.collection);
          alert('Successfuly removed from book shelf!');
        }
      });
    }
  },
  addToShelf: function (event) {
    // var shelving = this.collection.defaultShelves().shelvings().findWhere({book_id: $select.data('book-id')});
    // var fromShelf = this.collection.get(shelving.get('shelf_id'));
    // var toShelfId = $select.val();
    // var toShelf = this.collection.get(toShelfId);
    // shelving.save({shelf_id: toShelfId}, {
    //   success: function (model) {
    //     fromShelf.shelvings().remove(model);
    //     toShelf.shelvings().add(model);
    //     that.collection.trigger('update', that.collection);
    //   }
    // });
    // var that = this;
    // var $checkbox = $(event.currentTarget);
    // var shelf = this.collection.get(shelfId);

    var $select = $(event.currentTarget);
    var that = this;
    var bookId = $select.data('book-id');
    var shelfId = $select.val();
    shelving = new YourReads.Models.Shelving({book_id: bookId, shelf_id: shelfId});
    shelving.save({}, {
      success: function () {
        alert('Successfuly moved to book shelf!');
      }
    });

  }
  // Need to use composite view here to add book list-item into the view
});
