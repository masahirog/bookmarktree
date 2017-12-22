Rails.application.routes.draw do
  resources :bookmarks
  resources :categories
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'top#index'
  get 'bookmarks/get_jstree/:id' => 'bookmarks#get_jstree'
  post 'bookmarks/get_title/:id' => 'bookmarks#get_title'
end
