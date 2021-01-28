class CreateLocationMasters < ActiveRecord::Migration[6.1]
  def change
    create_table :location_masters do |t|
		t.integer  :user_id, default: 0, null: false
		t.string :latitude, null: false, default: ""
		t.string :longitude, null: false, default: ""
		t.timestamps
    end
  end
end
