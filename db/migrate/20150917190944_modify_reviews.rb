class ModifyReviews < ActiveRecord::Migration
  def change
    change_column :reviews, :content, :text, null: true
    add_column :reviews, :rating, :integer
  end
end
