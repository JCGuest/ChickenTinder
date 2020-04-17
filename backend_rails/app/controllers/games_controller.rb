class GamesController < ApplicationController
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
