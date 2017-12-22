json.array!(@bookmarks) do |bookmark|
  json.id     bookmark.id.to_s
  json.text   bookmark.name
  json.url    bookmark.url
  json.parent bookmark.parent_id ? bookmark.parent_id.to_s : '#'
  json.state do
    json.opened true
  end
end
