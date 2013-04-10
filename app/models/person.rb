class Person < ActiveRecord::Base
  attr_accessible :line_id, :start_time, :stop_time

  validates :line_id, :presence => true
  validates :start_time, :presence => true

  belongs_to :line
end
