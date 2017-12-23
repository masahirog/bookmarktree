class TopController < ApplicationController
  def index
    @bookmark = Bookmark.new
    @bookmarks = Bookmark.where(user_id: current_user.id)
    @directory = Directory.new
    @directories = Directory.where(user_id: current_user.id)
  end
end
