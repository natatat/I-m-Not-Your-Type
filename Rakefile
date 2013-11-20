$LOAD_PATH.unshift(File.expand_path('.'))

require 'type_app'
require 'sinatra/activerecord/rake'
require 'parser'
require 'models/passage'

begin
  require "rspec/core/rake_task"
  desc "Run all examples"
  RSpec::Core::RakeTask.new(:spec)
  task :default => :spec
rescue LoadError
end

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

namespace :db do
  desc "Populate database with random passages from blogz"
  task :populate do
    Parser.noko('http://natatdbc.tumblr.com/', 'http://therubynuby.tumblr.com/', 'http://annie-sing.tumblr.com/', 'http://jenn-wen.tumblr.com/', 'http://blog.danbender.net/', 'http://cartersowers.tumblr.com/', 'http://ryanhedges.tumblr.com/', 'http://steveo1485.tumblr.com/')
    150.times do
      Passage.create(text: Parser.random_passage[:passage], author: Parser.random_passage[:author])
    end
  end
end
