# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  username        :text
#  address         :string(255)
#  latitude        :integer
#  longitude       :string(255)
#  email           :string(255)
#  company_name    :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  password_digest :string(255)
#

class User < ActiveRecord::Base
	has_secure_password
end
