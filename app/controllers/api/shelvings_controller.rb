module Api
  class ShelvingsController < ApplicationController
    # def index
    #   @shelves = current_user.shelves.includes(:shelvings, :books)
    # end
    #
    # def show
    #   @shelf = current_user.shelves.find(params[:id])
    # end

    def update
      @shelving = current_user.shelvings.find(params[:id])
      if @shelving.update(shelving_params)
        render json: @shelving
      else
        render json: @shelving.errors.full_messages, status: 422
      end
    end


    private

    def shelving_params
      params.require(:shelving).permit(:shelf_id, :book_id)
    end
  end
end
