class GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :users
  has_many :users
end
