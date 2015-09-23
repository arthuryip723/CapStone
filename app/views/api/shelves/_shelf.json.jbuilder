json.extract! shelf, :id, :user_id, :name, :category, :books_count
# json.books shelf.books
json.shelvings do
  json.array! shelf.shelvings do |shelving|
    json.partial! 'api/shelvings/shelving', shelving: shelving
  end
end
