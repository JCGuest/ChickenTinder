class LikeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :yelp_id, :user
  belongs_to :user
end
