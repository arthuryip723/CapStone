class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :to_id, null: false
      t.integer :from_id, null: false
      t.timestamps null: false
    end

    add_index :friendships, :to_id
    add_index :friendships, :from_id
    add_index :friendships, [:to_id, :from_id], unique: true
  end
end
