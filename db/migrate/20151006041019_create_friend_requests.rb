class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :from_id, null: false
      t.integer :to_id, null: false
      t.integer :status, null: false
      t.timestamps null: false
    end

    add_index :friend_requests, :from_id
    add_index :friend_requests, :to_id
    add_index :friend_requests, [:from_id, :to_id], unique: true
  end
end
