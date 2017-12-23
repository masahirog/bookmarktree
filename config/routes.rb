Rails.application.routes.draw do
  resources :bookmarks
  resources :directories
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'top#index'
  post 'bookmarks/get_title/:id' => 'bookmarks#get_title'
  get "bookmarks/update_directory/:id" => "bookmarks#update_directory"
end
