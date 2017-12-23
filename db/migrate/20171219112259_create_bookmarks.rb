class CreateBookmarks < ActiveRecord::Migration[5.0]
  def change
    create_table :bookmarks do |t|
      t.string :name
      t.string :url
      t.integer :user_id
      t.integer :directory_id
      t.timestamps
    end
  end
end
