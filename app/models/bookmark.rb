class Bookmark < ActiveRecord::Base
  validates :url, presence: true
  validates :name, presence: true

  belongs_to :user
  belongs_to :directory
end
