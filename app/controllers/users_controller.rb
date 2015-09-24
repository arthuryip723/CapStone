class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.shelves.create(category: :to_read, name: "To Read")
      @user.shelves.create(category: :reading, name: "Reading")
      @user.shelves.create(category: :read, name: "Read")
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:password, :email)
  end
end
