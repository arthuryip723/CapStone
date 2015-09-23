module Api
  class ShelvesController < ApplicationController
    def index
      @shelves = current_user.shelves.includes(:shelvings, :books)
    end

    def show
      @shelf = current_user.shelves.find(params[:id])
    end
  end
end
