class GamesController < ApplicationController

    def search
        term = params[:term]
        location = params[:location]
        render json: Game.search(term, location)
    
    end

    def create
        game = Game.create
        render json: GameSerializer.new(game)
    end

    def update 
        # raise params.inspect
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
        params.permit(:term, :location, user_attributes: [:name, :id])
    end
    
end
