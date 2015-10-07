module Api
  class FriendRequestsController < ApplicationController
    def index
      @requests = current_user.to_requests
      render json: @requests
    end

    def accept
      @request = FriendRequest.find(params[:id])
      # current_user.froms.new(from: params[:to_id], to: params[:from_id])
      # if friendship doesn't exists, create one
      current_user.froms.create(to_id: @request.from_id) unless current_user.froms.find_by(to_id: @request.from_id)
      # if @friendship.save
      # else
      #   render json: @friendship.errors.full_messages, status: 422
      # end
      if @request.destroy
        render json: @request
      else
        render json: @request.errors.full_messages, status: 422
      end
    end

    def reject
      @request = FriendRequest.find(params[:id])
      if @request.destroy
        render json: @request
      else
        render json: @request.errors.full_messages, status: 422
      end
    end
  end
end
