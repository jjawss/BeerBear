class UsersController < ApplicationController
    def login
        @user = User.find_by({ username: params[:username] })
        if @user != nil && @user.authenticate(params[:password])
            puts "IN HERE"
            session[:user_id] = @user.id
            puts session[:user_id]
            render json: @user
        else 
            render json: { error: true, message: 'Invalid username/password' }
        end
    end

    def logout
        # session.delete(:user_id)
        # @current_user = 
        # user = User.find_by({username})
        # session[:user_id] = nil
        reset_session
    end

    def signup
        # user_id = session[:user_id]
        user = User.create({
            username: params[:username],
            password: params[:password] 
        })
    end

    def current_user
        puts "In the current user method"
        puts session[:user_id]
        user = User.find(session[:user_id].to_i)
        render json: user
    end

    def user_favorites
        puts session[:user_id]
        user = User.find(session[:user_id].to_i)
        user_favorites = user.beers
        render json: user_favorites, methods: :average_score
    end

    def user_favorite_ids
        user = User.find(params[:user_id])
        user_favorite_ids = user.favorites
        render json: user_favorite_ids
    end

    def create_user_favorite
        user = User.find(params[:user_id])
        user_favorites = user.beers
        favorite = Favorite.create({
          beer_id: params[:beer_id],
          user_id: user.id
        })
        user_favorites = user.beers
        render json: favorite.beer
    end
end