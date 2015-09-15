module Api
  class Api::BooksController < ApplicationController
    def create
    end

    def update
    end

    def destroy
    end

    def show
      @book = Book.find(params[:id])
    end

    private
    def book_params
      params.require(:book).permit(:title, :author_id, :isbn)
    end
  end
end
