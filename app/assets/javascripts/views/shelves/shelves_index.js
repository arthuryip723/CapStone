YourReads.Views.ShelvesIndex = Backbone.CompositeView.extend({
  template: JST['shelves/index'],
  initialize: function (options) {
    // this.books = this.collection.books();
    // this.listenTo(this.collection, 'sync', this.addAllShelf);
    this.listenTo(this.collection, 'sync update', this.render);
    // this.listenTo(this.collection, 'sync', this.mysync);
    this.callback = options.callback;
    // debugger
    var shelfDetailView = new YourReads.Views.ShelfDetail({
      // shelf: this.model,
      collection: this.collection
    });
    this.addSubview('.shelf-detail', shelfDetailView);
  },
  // mysync: function () {
  //   alert('sync');
  // },
  events: {
    'submit form': 'createShelf'
  },
  
  createShelf: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var data = $form.serializeJSON();
    var shelf = new YourReads.Models.Shelf();
    var that = this;
    shelf.save(data, {
      success: function (model) {
        that.collection.add(model);
      }
    });
  },
  render: function () {
    // console.log("render shelves index");
    this.$el.html(this.template({shelves: this.collection, books: this.collection.books()}));
    this.attachSubviews();
    // this.callback && this.callback();
    return this;
  },
  // addAllShelf: function () {
  //   alert('allshelf');
  // },
  removeAllSubviews: function () {
    var that = this;
    this.subviews().each (function (selectorSubviews, selector) {
      selectorSubviews.each(function (subview) {
        that.removeSubview(selector, subview);

      });
    });
  }
});
