Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
post '/games/business', to: 'games#business'
#user
post '/users/create', to: 'users#create'
patch '/users/:id', to: 'users#update'
get '/users/likes', to: 'users#likes'
# #likes 
post '/likes', to: 'likes#create'

# resources :users, only: [:create, :update] do 
#     resources :likes, only: [:create]
# end

end
