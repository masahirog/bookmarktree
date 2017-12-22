class AddAwesomeNestedSetColumnsToBookmarks < ActiveRecord::Migration[5.0]
  def change
    add_column :bookmarks, :parent_id, :integer
    add_column :bookmarks, :lft, :integer
    add_column :bookmarks, :rgt, :integer

    add_index :bookmarks, :parent_id
    add_index :bookmarks, :lft
    add_index :bookmarks, :rgt


    # オプションのフィールド
    add_column :bookmarks, :depth,          :integer
    add_column :bookmarks, :children_count, :integer

    add_index :bookmarks, :depth
  end
end
