YourReads.Views.ShelvesIndex = Backbone.CompositeView.extend({
  template: JST['shelves/index'],
  initialize: function (options) {
    // this.books = this.collection.books();
    // this.listenTo(this.collection, 'sync', this.addAllShelf);
    this.listenTo(this.collection, 'sync', this.render);
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
  render: function () {
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
