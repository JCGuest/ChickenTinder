class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :game 
  belongs_to :game
end
