Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get('/data',{to: 'beers#data'} )
  get('/profile',{to: 'users#current_user'})
  get('/beer/:id', {to:'beers#show'})
  post('/beer/reviews', {to:'reviews#create'})
  # patch('/beer/reviews/update', {to: 'reviews#update'})
  get('/beer/reviews/:id', {to:'reviews#show_reviews_by_beer'})
  get('/favorites/', {to:'favorites#index'})
  get('/user_favorites', {to: 'users#user_favorites'})
  get('/user_favorite_ids/:user_id', {to: 'users#user_favorite_ids'})
  post('/login', { to: 'users#login'})
  get('/logout', {to: 'users#logout'})
  post('/signup', {to: 'users#signup'})
  delete('/favorites/:fav_id', {to: 'favorites#delete_favorite'})
  post('/user_favorites/', {to:'users#create_user_favorite'})

end
