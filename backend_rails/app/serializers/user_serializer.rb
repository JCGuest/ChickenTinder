class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :likes , :errors
  has_many :likes
end
