class Book < ActiveRecord::Base
  belongs_to :author
  has_many :reviews

  def average_rating
    reviews.average('rating')
  end
end
