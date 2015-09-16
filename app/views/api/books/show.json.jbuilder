# json.extract!(
#   @book,
#   :id, :title, :author_id, :isbn
# )
# # json.author json.partial!('api/authors/author', author: @book.author)
# json.author @book.author

json.partial! 'api/books/book', book: @book, include_reviews: true
