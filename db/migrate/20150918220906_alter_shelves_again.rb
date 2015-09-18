class AlterShelvesAgain < ActiveRecord::Migration
  def change
    rename_column :shelves, :title, :name
  end
end
