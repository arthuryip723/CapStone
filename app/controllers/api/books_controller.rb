module Api
  class Api::BooksController < ApplicationController
    def index
      @books = Book.all.includes(:author)
      # render json: @books
    end

    def create
      @book = Book.create(book_params)
      if @book.save
        render 'show'
      else
        render json: @book.errors.full_messages, status: 422
      end
    end

    def update
    end

    def destroy
    end

    def show
      @book = Book.find(params[:id])
      @current_user_review = current_user.reviews.find_by_book_id(params[:id])
      # @current_user_review = current_user.reviews.find_by_book(@book)
      # @current_user_rating = current_user.ratings.find_by_book_id(params[:id])
      # render json: @book
    end

    private
    def book_params
      params.require(:book).permit(:title, :author_id, :isbn)
    end
  end
end
