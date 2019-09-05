require "sinatra"
require "sinatra/activerecord"
require 'sinatra/cross_origin'
require_relative "./lib/Kanban.rb"



class Server < Sinatra::Base

    get '/test' do
        headers 'Access-Control-Allow-Origin' => '*'
        'okay'
      end

end
