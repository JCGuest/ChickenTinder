class Game < ApplicationRecord
has_many :users

accepts_nested_attributes_for :users, reject_if: ->(attributes){ attributes['name'].blank? }, allow_destroy: true

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

    def user_attributes=(user_attributes)
      user = User.find_by(user_attributes) unless user_attributes[:name].blank?
      user.game_id = self.id 
      user.save
    end

  end

