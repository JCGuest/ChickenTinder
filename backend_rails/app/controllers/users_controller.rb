class UsersController < ApplicationController

    def create 
        user = User.create(user_params)
        render json: UserSerializer.new(user)
    end

    def login
        user = User.find_by(name: params[:name])
        if !user 
            user = User.create(user_params)
        end
        render json: UserSerializer.new(user)
    end

    def update 
        user = User.find_by(id: params[:id])
        user.update(user_params)
        render json: UserSerializer.new(user)
    end

    def likes
        user = User.find_by(name: params[:name])
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
        params.require(:user).permit(:name)
    end
    # def user_params
    #     params.permit(:name)
    # end
end
