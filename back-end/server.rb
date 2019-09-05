require "sinatra"
require "sinatra/activerecord"
require 'sinatra/cross_origin'
require_relative "./lib/TTT.rb"

class Server < Sinatra::Base

    get '/test' do
        headers 'Access-Control-Allow-Origin' => '*'
        david = User.find_by(user_name: "Tom")
        return david.wins.to_s
    end

    get '/userStats' do
        headers 'Access-Control-Allow-Origin' => '*'
        user = User.find_by(user_name: params[:name])
        response = [user.user_name, user.wins.to_s, user.loses.to_s, user.games_played.to_s, user.last_played]
        return response.to_s
    end

    get '/increaseWins' do  
        headers 'Access-Control-Allow-Origin' => '*'
        user = User.find_by(user_name: params[:name])
        user.wins += 1
        user.save
    end 

end
