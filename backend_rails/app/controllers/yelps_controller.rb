class YelpsController < ApplicationController

    def index
        # raise params.inspect
        term = params[:term]
        location = params[:location]
        render json: Yelp.search(term, location)
        # render json: {hello: 'world'}
        
    end


end
