class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :likes
  has_many :likes
end
