# json.extract!(
#   book,
#   :id, :title, :author_id, :isbn
# )
# json.author json.partial!('api/authors/author', author: @book.author)
# json.author book.author

json.extract!(book, :id, :title, :author_id, :isbn, :average_rating)
json.image_url asset_path(book.image.url(:original))
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

if include_current_user_review && book.current_user_review
  json.current_user_review do
    json.extract! book.current_user_review, :id, :user_id, :book_id, :rating
  end
end
