class LocationController < ApplicationController
	protect_from_forgery with: :null_session, :except => [:save_and_share_location, :fetch_user_all_location]
	def index
		if current_user
			@user_id = current_user.id
			render layout: "open_layers"
		else
			redirect_to new_user_session_path
		end
	end
	
	def save_and_share_location
		latitude = params[:latitude]
		longitude = params[:longitude]
		save_for = params[:save_for]
		location_id = LocationMaster.save_and_share_location(latitude, longitude, current_user.id)
		if !params[:users].nil?
			params[:users].each do |user_id|
				id = LocationMasterHierarchy.save_location_hierarchy_data(user_id, location_id)
				puts "id=>#{id}"
			end
		end
		render plain: "success"
	end
	
	def fetch_all_users
		id = params[:id]
		all_users = User.fetch_all_users(id)
		render json: all_users.to_json
	end
	
	def fetch_user_all_location
		user_id = params[:user_id]
		selected_user_id = params[:selected_user_id]
		location_obj = LocationMasterHierarchy.fetch_user_all_location(user_id, selected_user_id)
		render json: location_obj.to_json
	end
	
	def users
		if current_user
			@users = User.fetch_all_users
			puts @users.to_json
			render layout: "application"
		else
			redirect_to new_user_session_path
		end
	end
	
	def show_user_public_share_place
		if current_user
			user_details = User.where(("username = '#{params['username']}'")).take
			@selected_user_id = user_details['id']
			@user_id = current_user.id
			render layout: "open_layers"
		else
			redirect_to new_user_session_path
		end
	end
end
