module Api
  class ReviewsController < ApplicationController
    def index
      @review = Review.all
      render json: @review
    end

    def create
      @review = current_user.reviews.create(review_params)
      if @review.save
        render json: @review
      else
        render json: @review.errors.full_messages, status: 422
      end
    end

    def show
      @review = Review.find(params[:id])
    end

    def update
      @review = current_user.reviews.find(params[:id])
      if @review.update(review_params)
        render json: @review
      else
        render json: @review.errors.full_messages, status: 422
      end
    end

    private
    def review_params
      params.require(:review).permit(:content, :book_id, :rating)
    end
  end
end
