class OptionsController < ApplicationController

    def search
        term = params[:term]
        location = params[:location]
        Options.search(term, location)
end
