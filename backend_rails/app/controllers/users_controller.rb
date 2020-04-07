class UsersController < ApplicationController

    def create 
        user = User.new(name: params[:name])
        user.game_id = session[:game_id]
        user.save 
        render json: UserSerializer.new(user)
    end

    def update 
        user = User.find_by(id: params[:id])
        user.update(user_params)
        render json: UserSerializer.new(user)
    end

    private

    def user_params
        params.permit(:game_id)
end
