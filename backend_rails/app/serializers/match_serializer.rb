class MatchSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :yelp_id, :game
  belongs_to :game
end
