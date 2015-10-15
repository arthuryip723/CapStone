# json.array! @books do |book|
#   json.partial! 'api/books/book', book: book
# end

json.array! @books do |book|
  json.partial! 'api/books/book', book: book, include_reviews: false, include_author: true, include_current_user_review: true;
end
