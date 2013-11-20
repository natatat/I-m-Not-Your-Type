require 'nokogiri'
require 'open-uri'

module Parser
  def self.noko(*urls)
    @noko_urls = []

    urls.each do |url|
     @noko_urls << Nokogiri::HTML(open(url))
    end
  end

  def self.random_passage
    @page = @noko_urls[rand(@noko_urls.length + 1)]
    unless @page == nil
      self.paragraph
    else
      self.random_passage
    end
  end

  def self.paragraph
    paragraph = @page.css('p')[rand(50)]
    unless paragraph == nil
      passage = paragraph.text.to_s.strip
      author = @page.css('title').text
      return { passage: passage, author: author }
    else
      self.paragraph
    end
  end
end