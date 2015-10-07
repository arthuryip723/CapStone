class FriendRequest < ActiveRecord::Base
  # if a pending friend request exists, the user should try to accept it.

  # try to make a request, and use the recipient to receive it.
  before_save :default_values
  def default_values
    self.status ||= 0
  end
end
