Rails.application.routes.draw do
  get 'location/index'
	devise_for :users
	devise_scope :user do
	  authenticated :user do
		root 'location#index', as: :authenticated_root
	  end

	  unauthenticated do
		root 'devise/sessions#new', as: :unauthenticated_root
	  end
	end
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	get 'share_location', to: 'location#index'
	post 'save_and_share_location', to: 'location#save_and_share_location'
	post 'fetch_all_users', to: 'location#fetch_all_users'
	post 'fetch_user_all_location', to: 'location#fetch_user_all_location'
	get 'users', to: 'location#users'
	get '/:username'  => 'location#show_user_public_share_place'
end
