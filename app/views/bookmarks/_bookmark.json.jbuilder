json.extract! bookmark, :id, :name, :string, :url, :text, :created_at, :updated_at
json.url bookmark_url(bookmark, format: :json)
