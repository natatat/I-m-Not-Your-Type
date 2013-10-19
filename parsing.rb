require 'nokogiri'
require 'open-uri'

class Parse

  def self.noko(*urls)
    @noko_urls = []

    urls.each do |url|
     @noko_urls << Nokogiri::HTML(open(url))
    end
  end

  def self.rand_passage
    rand_page = @noko_urls[rand(@noko_urls.length + 1)]
    unless rand_page == nil
      { passage: rand_page.css('p')[rand(20)].text.strip, author: rand_page.css('title').text }
    else
      self.rand_passage
    end
  end
end