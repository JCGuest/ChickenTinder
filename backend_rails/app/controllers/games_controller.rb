class GamesController < ApplicationController

    def new
        # raise params.inspect
        term = params[:term]
        location = params[:location]
        game = Game.new
        # render json: game.new_game(term, location, players)
        render json: game.new_game(term, location)
    
    end
    
end
