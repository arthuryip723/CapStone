module Api
  class FriendsController < ApplicationController
    private
    def friendship_params
      params.require(:friendship).permit(:from_id, :to_id)
    end
  end
end
