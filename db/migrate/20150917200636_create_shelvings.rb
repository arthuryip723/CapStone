class CreateShelvings < ActiveRecord::Migration
  def change
    create_table :shelvings do |t|

      t.timestamps null: false
    end
  end
end
