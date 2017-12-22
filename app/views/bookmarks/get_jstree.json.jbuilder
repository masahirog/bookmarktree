
json.bookmark do |json|
  json.array! (@bookmarks) do |bookmark|
    json.id    bookmark.id
    json.name    bookmark.name
    json.url    bookmark.url
  end
end
