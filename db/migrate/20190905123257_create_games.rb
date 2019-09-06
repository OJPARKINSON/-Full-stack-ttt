class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |col|
      col.string :board
      col.integer :player1_id
      col.integer :player2_id
      col.string :timePlayed
    end
  end
end
