class LocationMaster < ApplicationRecord
	def self.save_and_share_location(latitude="", longitude="", user_id)
		location_master_obj = LocationMaster.new 
		location_master_obj.latitude = latitude
		location_master_obj.longitude = longitude
		location_master_obj.user_id = user_id
		location_master_obj.save
		return location_master_obj.id
	end
end
