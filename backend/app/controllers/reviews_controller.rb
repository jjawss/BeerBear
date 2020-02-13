class ReviewsController < ApplicationController

  def create 
    user_id = session[:user_id].to_i

    review = Review.create({
      score: params[:review_score],
      beer_id: params[:review_beer_id],
      user_id: user_id,
      content: params[:review_content] 
    })
    render json: review, include: [:user]
  end

  def show_reviews_by_beer
    reviews = Review.where(beer_id: params[:id])
    # reviews = Review.where(beer_id: 151)
    render json:reviews, include: [:user] 
  end

  # def update
  #   user = self.current_user()
  #   review = Review.find_by({user_id:user.id, beer_id : params[:review_beer_id] })
  #   review.update()
  # end
end