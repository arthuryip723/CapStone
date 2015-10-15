class Book < ActiveRecord::Base
  include PgSearch
  attr_accessor :current_user_review
  multisearchable against: :title
  belongs_to :author
  has_many :reviews, -> { includes :user }
  validates :title, :author, presence: true
  has_attached_file :image, default_url: "missing.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  def average_rating
    average_rating = reviews.average('rating')
    average_rating ? average_rating.round(2) : average_rating
  end

  # def current_user_review
  #   current_user.reviews.find_by_book_id(params[:id]) if current_user
  # end
end
