class Game < ApplicationRecord
API_KEY = ENV['KEY']
API_HOST = "https://api.yelp.com"
SEARCH_PATH = "/v3/businesses/search"
DEFAULT_TERM = "dinner"
DEFAULT_LOCATION = "Austin, TX"
SEARCH_LIMIT = 2

  def self.search(term, location)
      url = "#{API_HOST}#{SEARCH_PATH}"
      params = {
      term: term,
      location: location,
      limit: SEARCH_LIMIT
      }
    
      response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
      return response.parse
  end

end

