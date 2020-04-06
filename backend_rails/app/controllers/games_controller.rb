class GamesController < ApplicationController

    def new_game
        # raise params.inspect
        term = params[:term]
        location = params[:location]
        render json: Game.new_game(term, location)
        # render json: {hello: 'world'}
    end
    
end
