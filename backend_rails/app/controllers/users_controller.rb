class UsersController < ApplicationController

    def create 
        user = User.find_by(name: params[:name])
        if user 
            user.game_id = params[:game_id]
            user.save 
        else user = User.new(name: params[:name])
            user.game_id = params[:game_id]
            user.save 
        end
        render json: UserSerializer.new(user)
    end

    def update 
        user = User.find_by(id: params[:id])
        user.update(user_params)
        render json: UserSerializer.new(user)
    end

    def name
        user = User.find_by(name: params[:name])
        render json: UserSerializer.new(user)
    end

    private

    def user_params
        params.permit(:game_id, :name, game_params: [:id])
    end
end
