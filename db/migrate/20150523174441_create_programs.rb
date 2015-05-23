class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
      t.string :title, limit: 255, null: false
      t.string :url, limit: 255, null: false
      t.string :provider, null: false, limit: 80
      t.boolean :ppv, null: false, default: false

      t.timestamps null: false
    end

    add_index :programs, :url, unique: true
  end
end
