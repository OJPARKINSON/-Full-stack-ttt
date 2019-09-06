require_relative "../lib/TTT"

user = User.create(user_name: "Tom", wins: 0, loses: 0, games_played: 0, last_played: Time.new.to_s)
game = Game.create(board: "x,x,x,x,x,x,x,x,x", player1_id: 1, player2_id: 2, timePlayed: Time.new.to_s)