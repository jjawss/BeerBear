class Beer < ActiveRecord::Base
  has_many :reviews
  has_many :favorites

  def average_score
    self.reviews.average(:score).to_i
  end
end