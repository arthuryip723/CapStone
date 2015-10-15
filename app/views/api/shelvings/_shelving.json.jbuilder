json.extract! shelving, :id, :shelf_id, :book_id
json.book do
  json.partial! '/api/books/book', book: shelving.book, include_author: true, include_reviews: false, include_current_user_review: false
end
