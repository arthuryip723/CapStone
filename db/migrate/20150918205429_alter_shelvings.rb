class AlterShelvings < ActiveRecord::Migration
  def change
    add_column :shelvings, :book_id, :integer
    add_column :shelvings, :shelf_id, :integer
    add_index :shelvings, :book_id
    add_index :shelvings, :shelf_id
  end
end
