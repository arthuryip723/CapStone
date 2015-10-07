module Api
  class ShelvesController < ApplicationController
    def index
      @shelves = current_user.shelves.includes(:shelvings, :books)
    end

    def create
      @shelf = current_user.shelves.new(shelf_params.merge({category: :custom}))
      if @shelf.save
        render :show
      else
        render json: @shelf.errors.full_messages, status: 422
      end
    end

    def show
      @shelf = current_user.shelves.find(params[:id])
    end

    private

    def shelf_params
      params.require(:shelf).permit(:name)
    end
  end
end
