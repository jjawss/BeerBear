class ApplicationController < ActionController::API
    
    def current_user
        User.find(session[:user_id].to_i)
    end
end
