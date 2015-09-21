class Book < ActiveRecord::Base
  belongs_to :author
  has_many :reviews, -> { includes :user }
  validates :title, :author, presence: true
  def average_rating
    reviews.average('rating')
  end
end
