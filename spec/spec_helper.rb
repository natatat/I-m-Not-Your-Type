$LOAD_PATH.unshift(File.expand_path('.'))
ENV['RACK_ENV'] ||= 'test'

#encoding: utf-8

require 'type_app'
require 'capybara/rspec'
require 'shoulda-matchers'

Capybara.app = Sinatra::Application

RSpec.configure do |config|
  config.formatter = :documentation
  config.color_enabled = true
  config.after do
    Passage.destroy_all
  end
end