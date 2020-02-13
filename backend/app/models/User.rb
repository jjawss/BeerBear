class User < ActiveRecord::Base
  has_many :reviews
  has_many :favorites
  has_many :beers, through: :favorites
  has_secure_password
end
