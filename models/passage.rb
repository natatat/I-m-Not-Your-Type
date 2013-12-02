#encoding: utf-8

class Passage < ActiveRecord::Base
  validates :text, presence: true
  validates :text, uniqueness: true
  validates :text, length: { minimum: 20, maximum: 250 }

  before_save :remove_trailing_spaces, :fix_punctuation

  def remove_trailing_spaces
    self.text.gsub!(/&nbsp;/, "")
    self.text.gsub!(/ $/, "")
  end

  def fix_punctuation
    self.text.gsub!(/’/, "'")
    self.text.gsub!(/‘/, "'")
    self.text.gsub!(/“/, '"')
    self.text.gsub!(/”/, '"')
    self.text.gsub!(/…/, "...")
  end

end