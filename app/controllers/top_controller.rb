class TopController < ApplicationController
  def index
    @bookmark = Bookmark.new
    @bookmarks = Bookmark.all
  end
end
