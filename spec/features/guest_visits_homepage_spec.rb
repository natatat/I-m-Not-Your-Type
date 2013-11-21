require 'spec_helper'

feature "Guest visits home page" do
  background do
    visit "/"
  end

  scenario "Guest can see the name of the site and required text" do
    expect(page).to have_content("g_snakes.type!")
  end

end