module Api
  class ShelvesController < ApplicationController
    def index
      @shelves = current_user.shelves
    end

    def show
      @shelf = current_user.shelves.find(params[:id])
    end
  end
end
