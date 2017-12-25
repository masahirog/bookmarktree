class Bookmark < ActiveRecord::Base
  validates :url, presence: true
  validates :name, presence: true

  belongs_to :user
  belongs_to :directory

  def self.search(params)
   if params
     data = Bookmark.all
     data = data.where(['name LIKE ?', "%#{params["name"]}%"]) if params["name"].present?
     data
   else
     Material.all
   end
  end
end
