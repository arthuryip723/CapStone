YourReads.Views.Search = Backbone.View.extend({
  template: JST['searches/search'],
  initialize: function (options) {
    this.shelves = options.shelves;
    this.searchResults = new YourReads.Collections.SearchResults();
    this.listenTo(this.searchResults, 'sync', this.render);
  },
  className: 'search-view',
  events: {
    "change .query": "search",
    'change select': 'addToShelf',
    'change :checkbox': 'toggleShelf'
  },

  render: function () {
    // alert('sync');
    // debugger;
    this.$el.html(this.template({results: this.searchResults, shelves: this.shelves}));
    return this;
  },

  search: function (event) {
    // alert('here')
    event.preventDefault();
    // this.searchResults.pageNum = 1;
    this.searchResults.query = this.$(".query").val();

    this.searchResults.fetch({
      data: {
        query: this.searchResults.query,
        // page: 1
      }
    });
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
          alert('Successfuly added to book shelf!');
        }
      });
    } else {
      var shelving = shelf.shelvings().findWhere({book_id: bookId});
      shelving.destroy({
        success: function (model) {
          alert('Successfuly removed from book shelf!');
        }
      });
    }
  },
  addToShelf: function (event) {
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
});
