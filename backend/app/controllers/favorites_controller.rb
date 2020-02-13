class FavoritesController < ApplicationController
  def show_favorites_by_user
    favorites = Favorite.where(user: params[:id])
        # reviews = Review.where(beer_id: 151)
      render json:favorites, include: [:beer] 
  end
  
  def show_favorites_by_beer
    favorites = Favorite.where(beer_id: params[:id])
    # reviews = Review.where(beer_id: 151)
    render json:favorites, include: [:user] 
  end

  def create 
    user_id = session[:user_id].to_i

    favorite = Favorite.create({
      product_id: params[:beer_id],
      user_id: user_id,
    })
    render json: favorite, include: [:user]
  end

  def delete_favorite
    user_id = session[:user_id]
    Favorite.destroy(params[:fav_id])
    # Favorite.destroy(beer_id: params[:beer_id], user_id: session[:user_id])
  end

  def index
    all_favorites = Favorite.all

    render json: all_favorites
  end
end