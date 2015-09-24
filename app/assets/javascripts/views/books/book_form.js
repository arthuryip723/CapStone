YourReads.Views.BookForm = Backbone.View.extend({
  template: JST['books/form'],
  tagName: 'form',
  className: 'book-form',
  events: {
    'click button': 'submit',
    'change #image': 'fileInputChange'
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
    // this.model.save(attrs, {
    //   success: function (model) {
    //     that.collection.add(model, {merge: true});
    //     Backbone.history.navigate('', {trigger: true});
    //   },
    //   error: function (model, resp) {
    //     that.$('.error-list').empty();
    //     resp.responseJSON.forEach(function (error) {
    //       var $li = $('<li>');
    //       $li.html(error);
    //       that.$('.error-list').append($li);
    //     });
    //     that.$('.error-list').append('<br>');
    //   }
    // })

    var title = attrs.title;
    var author_name = attrs.author_name
    var file = this.$("#image")[0].files[0];

    var formData = new FormData();
    // formData.append("title", title);
    // formData.append("author_name", author_name);
    // formData.append("image", file);

    formData.append("book[title]", title);
    formData.append("book[author_name]", author_name);
    formData.append("book[image]", file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      },
      error: function (model, resp) {
        that.$('.error-list').empty();
        resp.responseJSON.forEach(function (error) {
          var $li = $('<li>');
          $li.html(error);
          that.$('.error-list').append($li);
        });
        that.$('.error-list').append('<br>');
      }
    });
  },
  render: function () {
    this.$el.html(this.template({book: this.model, authors: this.authors}));
    return this;
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview").attr("src", src);
  }
});
