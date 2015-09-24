class Author < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  has_many :books
  validates :name, presence: true
end
