class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :likes, :errors, :game_id
  has_many :likes
end
