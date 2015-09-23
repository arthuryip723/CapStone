class ModifyShelvesAndShelvings < ActiveRecord::Migration
  def change
    change_column :shelves, :user_id, :integer, null: false
    change_column :shelves, :name, :string, null: false
    change_column :shelves, :category, :string, null: false
    change_column :shelvings, :book_id, :integer, null: false
    change_column :shelvings, :shelf_id, :integer, null: false
  end
end
