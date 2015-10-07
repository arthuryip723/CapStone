module Api
  class ShelvingsController < ApplicationController
    # def index
    #   @shelves = current_user.shelves.includes(:shelvings, :books)
    # end
    #
    # def show
    #   @shelf = current_user.shelves.find(params[:id])
    # end

    def create
      # @shelving = current_user.shelvings.create(shelving_params)
      @shelving = Shelving.find_by(shelving_params)
      if @shelving
        render :show
        return
      end

      shelf = Shelf.find(shelving_params[:shelf_id])
      if !shelf.custom # if it's default shelves
        @shelving = current_user.shelvings.joins(:shelf).where(book_id: shelving_params[:book_id], "shelves.category" => ["read", "to_read", "reading"]).first
        if @shelving
          if @shelving.update(shelving_params)
            render :show
          else
            render json: @shelving.errors.full_messages, status: 422
          end
          return
        end
      end

      @shelving = Shelving.new(shelving_params)
      if @shelving.save
        render :show
      else
        render json: @shelving.errors.full_messages, status: 422
      end
    end

    def destroy
      @shelving = Shelving.find(params[:id])
      # @shelving.try(:destroy)
      # render json: {}
      if @shelving.destroy
        # render json: @shelving
        render :show
      else
        render json: @shelving.errors.full_messages, status: 422
      end
    end

    def update
      @shelving = current_user.shelvings.find(params[:id])
      if @shelving.update(shelving_params)
        # render json: @shelving
        render :show
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
