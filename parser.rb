require 'nokogiri'
require 'open-uri'

#encoding: utf-8

module Parser
  def self.noko(*urls)
    @noko_urls = []

    urls.each do |url|
     @noko_urls << Nokogiri::HTML(open(url))
    end
  end

  def self.random_passage
    @page = @noko_urls[rand(@noko_urls.length)]
    self.paragraph
  end

  def self.paragraph
    all_the_paragraphs = @page.css('p')
    paragraph = all_the_paragraphs[rand(all_the_paragraphs.size)]
    unless paragraph == nil
      passage = paragraph.text.strip
      author = @page.css('title').text
      return { passage: passage, author: author }
    else
      self.paragraph
    end
  end
end