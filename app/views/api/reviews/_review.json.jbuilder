json.extract! review, :user_id, :book_id, :content, :rating
# json.user review.user
json.user do
  json.partial! 'api/users/user', user: review.user
end
