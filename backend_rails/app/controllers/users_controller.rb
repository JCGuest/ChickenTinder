class UsersController < ApplicationController

    def create 
        user = User.find_or_create_by(name: params[:name])
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
        # render json: {
        #     "hello": "world"
        # }
    end

    private

    def user_params
        params.permit(:name)
    end
end
