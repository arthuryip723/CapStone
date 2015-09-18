class Shelf < ActiveRecord::Base
  has_many :shelvings
  has_many :books, through: :shelvings

  def books_count
    self.books.count
  end
end
