class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.shelves.create(category: :to_read, name: "To Read")
      @user.shelves.create(category: :reading, name: "Reading")
      @user.shelves.create(category: :read, name: "Read")
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def friends
    @users = current_user.friends
    render :index
  end

  protected

  def user_params
    self.params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
