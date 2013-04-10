class Line < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :name
  
  validates :address, :presence => true
  validates :latitude, :presence => true
  validates :longitude, :presence => true
  validates :name, :presence => true

  has_many :people, dependent: :destroy

  def as_json(options={})
    super({methods: [ 'people' ]}).merge(options)
  end
end
