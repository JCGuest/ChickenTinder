class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :game, :likes 
  belongs_to :game
  has_many :likes
end
