class Shelving < ActiveRecord::Base
  belongs_to :book
  belongs_to :shelf
  validates :shelf, :book, presence: true
end
