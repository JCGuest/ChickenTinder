class GamesController < ApplicationController

    def search
        term = params[:term]
        location = params[:location]
        render json: Game.search(term, location)
    
    end

    def create
        game = Game.create
        session[:game_id] = game.id
        render json: GameSerializer.new(game)
    end

    def update 
        game = Game.find_by(id: params[:game_id])
        game.update(game_params)
        render json: GameSerializer.new(game)
    end

    def show
        game = Game.find_by(id: params[:id])
        render json: GameSerializer.new(game)
    end

    private

    def game_params 
        params.permit(:matches, :user_attributes [:name])
    end
    
end
