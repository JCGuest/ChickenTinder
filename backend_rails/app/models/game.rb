class Game < ApplicationRecord
has_many :users, class_name: "user", foreign_key: "reference_id"

API_KEY = ENV['KEY']
API_HOST = "https://api.yelp.com"
SEARCH_PATH = "/v3/businesses/search"
DEFAULT_TERM = "dinner"
DEFAULT_LOCATION = "Austin, TX"
SEARCH_LIMIT = 15

def new_game(term, location)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
    user: session[:user_id]  
    term: term,
    location: location,
    limit: SEARCH_LIMIT
    }
  
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
    return response.parse
    # "#{term + location}"
  end

end
