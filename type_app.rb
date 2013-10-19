$LOAD_PATH.unshift(File.expand_path('.'))

require 'sinatra'
require 'sinatra/activerecord'
require 'models/passage'

begin
  require 'dotenv'
  Dotenv.load
rescue LoadError
end

set :database, ENV['DATABASE_URL']

get '/' do
  @passages = Passage.all
  @passage = Passage.find(rand(20))
  erb :index
end

# controller than does background stuff. ONE database import.
# where should we create passages for the database? somewhere else?
# then insert a random one when user loads the page?
# think about information transfer. clicking a refresh button.
# also, user high score. json? wut wut