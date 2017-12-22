class CreateBookmarks < ActiveRecord::Migration[5.0]
  def change
    create_table :bookmarks do |t|
      t.string :name
      t.string :string
      t.string :url
      t.string :text

      t.timestamps
    end
  end
end
