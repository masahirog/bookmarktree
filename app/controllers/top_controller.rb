class TopController < ApplicationController
  def index
    @bookmark = Bookmark.new
    @bookmarks = Bookmark.where(user_id: current_user.id)
    @category = Directory.new
    @categories = Directory.where(user_id: current_user.id)
  end
end
