class GamesController < ApplicationController

    def new 
        game = Game.new 
        game.save
        render json: GameSerializer.new(game)
    end

    def show 
        game = Game.find(params[:id])
        render json: GameSerializer.new(game)
    end

    def search
        term = params[:term]
        location = params[:location]
        render json: Game.search(term, location)
    end

    def business
        business_id = params[:business_id]
        render json: Game.business(business_id)
    end

end
