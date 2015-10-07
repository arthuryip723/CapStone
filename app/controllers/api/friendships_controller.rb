module Api
  class FriendshipsController < ApplicationController
    def create
      # if friendship deos not exists
      @friendship = current_user.froms.new(friendship_params)
      if @friendship.save
        # add a friendrequest as well
        # if pending friendship request doesn't exists
        request = current_user.from_requests.find_by(friendship_params)
        request ||= current_user.from_requests.create(friendship_params)

        render json: @friendship
      else
        render json: @friendship.errors.full_messages, status: 422
      end
    end

    # def accept
    #
    # end

    private
    def friendship_params
      params.require(:friendship).permit(:to_id)
    end
  end
end
