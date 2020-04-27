class User < ApplicationRecord
    belongs_to :game
    has_many :likes
    validates :name, presence: :true
    validates :name, uniqueness: :true
end
