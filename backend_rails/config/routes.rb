Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
post '/games/business', to: 'games#business'
#user
post 'users/create', to: 'users#create'
post '/users/login', to: 'users#login'
patch '/users/:id', to: 'users#update'
get '/users/likes', to: 'users#likes'
# #likes 
post '/likes', to: 'likes#create'

end
