json.results do
  json.array! @search_results do |search_result|
    if search_result.searchable_type == "Book"
      json.partial! "api/books/book", book: search_result.searchable, include_author: true, include_reviews: false
      json._type "Book"
    else
      json.partial! "api/authors/author", author: search_result.searchable
      json._type "Author"
    end
  end
end
