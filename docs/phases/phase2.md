# Phase 2: Viewing Blogs and Posts

## Rails
### Models

### Controllers
* Api::BooksController (create, destroy, index, show)
* Api::ReviewController (create, destroy, show, update)

### Views
* books/show.json.jbuilder

## Backbone
### Models
* Book (parses nested `reviews` association)
* Review

### Collections
* Books
* Reviews

### Views
* BookForm
* BookShow (composite view, contains ReviewsIndex subview)
* ReviewsIndex (composite view, contains ReviewsIndexItem subviews)
* ReviewsIndexItem
* ReviewShow

## Gems/Libraries
