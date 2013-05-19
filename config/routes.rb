Vienname::Application.routes.draw do
  get "static/about"

 resources :names
 root :to => 'names#index'
end
