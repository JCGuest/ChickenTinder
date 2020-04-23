class UsersController < ApplicationController

    def create 
        user = User.new(user_params)
        if params[:game_id]
            user.game_id = params[:game_id]
            user.save
        else 
            user.game_id = Game.all.last.id
            user.save
        end        
        render json: UserSerializer.new(user)
    end

    def login
        user = User.find_by(name: params[:user][:name])
        user.game_id = params[:user][:game_id]
        render json: UserSerializer.new(user)
    end

    def update 
        user = User.find_by(id: params[:id])
        user.update(user_params)
        render json: UserSerializer.new(user)
    end

    # def delete 
    #     user = User.find_by(name: params[:name])
    #     user.destroy 
    #     render json: {
    #         'message': "Delted user: #{params[:name]}"
    #     }
    # end

    private

    def user_params 
        params.require(:user).permit(:name, :game_id)
    end
    # def user_params
    #     params.permit(:name)
    # end
end
