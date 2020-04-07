class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :matches, :users
  has_many :users 
end
