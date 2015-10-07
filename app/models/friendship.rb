class Friendship < ActiveRecord::Base
  belongs_to :to_user, class_name: "User", foreign_key: :to_id, primary_key: :id
  belongs_to :from_user, class_name: "User", foreign_key: :from_id, primary_key: :id
end
