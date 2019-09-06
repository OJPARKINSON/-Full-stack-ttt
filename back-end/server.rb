require "sinatra"
require "sinatra/activerecord"
require 'sinatra/cross_origin'
require_relative "./lib/TTT.rb"

class Server < Sinatra::Base

    get '/userStats' do
        headers 'Access-Control-Allow-Origin' => '*'
        user = User.find_by(user_name: params[:name])
        response = [user.id, user.user_name, user.wins.to_s, user.loses.to_s, user.games_played.to_s, user.last_played]
        return response.to_s
    end

    get '/gameEnded' do  
        headers 'Access-Control-Allow-Origin' => '*'
        winner = User.find_by(user_name: params[:winner])
        loser = User.find_by(user_name: params[:loser])
        winner.wins += 1
        loser.loses += 1
        winner.games_played += 1
        loser.games_played += 1
        winner.save
        loser.save
    end 

    get '/draw' do  
        headers 'Access-Control-Allow-Origin' => '*'
        p1 = User.find_by(user_name: params[:p1])
        p2 = User.find_by(user_name: params[:p2])
        p1.games_played += 1
        p2.games_played += 1
        p1.save
        p2.save
    end 

end
