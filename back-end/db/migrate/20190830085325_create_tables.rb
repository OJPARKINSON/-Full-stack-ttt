class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table(:boards) do |i|
      i.string :title
      i.string :last_viewed
    end

    create_table(:tasks) do |i|
      i.string :status
      i.string :last_viewed
      i.string :text
      i.integer :member_id
      i.integer :board_id
    end

    create_table(:members) do |i|
      i.string :name
    end
  end
end
