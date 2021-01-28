class CreateLocationMasterHierarchies < ActiveRecord::Migration[6.1]
  def change
    create_table :location_master_hierarchies do |t|
		t.integer  :user_id, default: 0, null: false
		t.integer  :location_id, default: 0, null: false
		t.integer  :deleted, default: 0, null: true
      t.timestamps
    end
  end
end
