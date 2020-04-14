class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :users
  has_many :users 
end
