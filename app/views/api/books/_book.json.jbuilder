# json.extract!(
#   book,
#   :id, :title, :author_id, :isbn
# )
# json.author json.partial!('api/authors/author', author: @book.author)
# json.author book.author

json.extract!(book, :id, :title, :author_id, :isbn, :average_rating)
json.author book.author
if include_reviews
  json.reviews book.reviews
end
