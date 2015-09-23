# json.extract!(
#   book,
#   :id, :title, :author_id, :isbn
# )
# json.author json.partial!('api/authors/author', author: @book.author)
# json.author book.author

json.extract!(book, :id, :title, :author_id, :isbn, :average_rating)
if include_author
  json.author do
    json.extract! book.author, :id, :name
  end
end
if include_reviews
  # json.reviews book.reviews
  json.reviews do
    json.array! book.reviews do |review|
      json.partial! 'api/reviews/review', review: review
      json.extract! review
    end
  end
end
