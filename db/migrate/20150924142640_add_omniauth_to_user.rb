class AddOmniauthToUser < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :fname, :string
    add_column :users, :lname, :string
    add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true
  end
end
