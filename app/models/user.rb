class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
	validates_presence_of :username
	validates_uniqueness_of :username
		 
	def self.fetch_all_users(user_id="")
		where_clause = ""
		where_clause = "where id not in (#{user_id})" if user_id !=""
		return User.connection.select_all("select * from users #{where_clause}")
	end
end
