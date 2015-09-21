json.partial! 'api/authors/author', author: @author
json.books do
  json.array! @author.books do |book|
    json.partial! 'api/books/book', book: book, include_reviews: false, include_author: true;
  end
end
