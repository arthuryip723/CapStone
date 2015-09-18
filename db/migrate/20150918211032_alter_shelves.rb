class AlterShelves < ActiveRecord::Migration
  def change
    rename_column :shelves, :type, :category
  end
end
