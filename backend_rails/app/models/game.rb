class Game < ApplicationRecord
has_many :users
@api_key = ENV['YELP']
@api_host = "https://api.yelp.com"
@search_path = "/v3/businesses/search"
@search_limit = 10
@business_path = "/v3/businesses/"

  def self.search(term, location)
      url = "#{@api_host}#{@search_path}"
      params = {
      term: term,
      location: location,
      limit: @search_limit
      }
    
      response = HTTP.auth("Bearer #{@api_key}").get(url, params: params)
      return response.parse
  end

  def self.business(business_id)
    url = "#{@api_host}#{@business_path}#{business_id}"
    response = HTTP.auth("Bearer #{@api_key}").get(url)
    return response.parse
  end

  def likes 
    all_likes = []
    self.users.all.each do |user|
      user.likes.all.each do |like|
        all_likes.push(like.name)
      end
    end
    return all_likes
  end

end

