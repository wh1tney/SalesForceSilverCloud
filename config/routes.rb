  Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  root 'welcome#index'
  get '/home', to: 'sessions#index'

  # CLIENTS
  get '/clients' => "sfdc_clients#index", as: 'clients'
  get '/clients/:id' => "sfdc_clients#show"

  # USERS
  get '/users' => "users#index"
  post '/users' => "users#create"
  get '/users/:id' => "users#show"

  # omniauth routes
  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/auth/failure', :to => 'sessions#failure'
  get '/logout', :to => 'sessions#destroy'

end
