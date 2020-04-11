class MatchesController < ApplicationController
    def create
        match = Match.create(name: params[:name], yelp_id: params[:yelp_id])
        match.game_id = params[:game_id]
        match.save 
        render json: MatchSerializer.new(match)
      end
end
