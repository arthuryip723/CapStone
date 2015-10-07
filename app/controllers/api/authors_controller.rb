module Api
  class AuthorsController < ApplicationController
    def index
      @authors = Author.all
      render json: @authors
    end

    def create
      @author = Author.new(author_params)
      if @author.save
        render 'show'
      else
        render json: @author.errors.full_messages, status: 422
      end
    end

    def show
      @author = Author.find(params[:id])
      # show with authored book
    end

    private
    def author_params
      params.require(:author).permit(:name)
    end
  end
end
