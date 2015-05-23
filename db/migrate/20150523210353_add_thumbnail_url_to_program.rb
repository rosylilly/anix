class AddThumbnailUrlToProgram < ActiveRecord::Migration
  def change
    add_column :programs, :thumbnail_url, :string
  end
end
