class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |col|
      col.string :user_name, unique: true
      col.integer :wins
      col.integer :loses
      col.integer :games_played
      col.string :last_played
    end
  end
end
