module Api
  class Api::BooksController < ApplicationController
    def index
      @books = Book.all.includes(:author)
      # render json: @books
    end

    def create
      author_name = params[:book][:author_name]
      author = Author.find_by_name(author_name)
      unless author
        author = Author.create!(name: author_name)
      end
      # return "hello world"
      # puts "hello world!"
      # p "book_params"
      # p book_params
      # p params
      @book = Book.create(book_params.merge(author: author))
      # @book = Book.create(book_params)
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

    def my_books
      @books = current_user.books
      render :index
    end

    private
    def book_params
      # params.require(:book).permit(:title, :author_name, :isbn)
      params.require(:book).permit(:title, :author_id, :isbn, :image)
    end
  end
end
