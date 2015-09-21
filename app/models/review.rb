class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :book
  validates_numericality_of :rating, in: 1..5, allow_nil: true
  validates_uniqueness_of :user_id, :scope => :book_id
end
