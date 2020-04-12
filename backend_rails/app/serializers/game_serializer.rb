class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :users, :likes
  has_many :users 
  has_many :likes
end
