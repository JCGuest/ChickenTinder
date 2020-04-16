class GamesController < ApplicationController
    def search
        term = params[:term]
        location = params[:location]
        render json: Game.search(term, location)
    end
end
