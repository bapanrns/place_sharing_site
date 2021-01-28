class LocationMasterHierarchy < ApplicationRecord
	def self.save_location_hierarchy_data(user_id, location_id)
		location_master_hierarchy_obj = LocationMasterHierarchy.new 
		location_master_hierarchy_obj.user_id = user_id
		location_master_hierarchy_obj.location_id = location_id
		location_master_hierarchy_obj.save
		return location_master_hierarchy_obj.id
	end
	
	def self.fetch_user_all_location(id="", selected_user_id="")
		if selected_user_id !=""
			sql = "SELECT lm.latitude, lm.longitude FROM location_master_hierarchies AS lmh, location_masters AS lm WHERE lm.id=lmh.location_id AND lmh.deleted = 0 AND lm.user_id = '#{selected_user_id}' AND lmh.user_id IN(0)"
		else
			user_ids = "0"
			user_ids = "0, #{id}" if id !=""
			sql = "SELECT lm.latitude, lm.longitude FROM location_master_hierarchies AS lmh, location_masters AS lm WHERE lm.id=lmh.location_id AND lmh.user_id IN (#{user_ids}) AND lmh.deleted = 0"
		end
		return LocationMasterHierarchy.connection.select_all(sql)
	end
end
