class Passage < ActiveRecord::Base
  validates :text, presence: true
  validates :text, uniqueness: true
  validates :text, length: { minimum: 20, maximum: 250 }

  before_save :remove_trailing_spaces, :fix_quotes

  def remove_trailing_spaces
    self.text.gsub!(/&nbsp;/, "")
  end

  def fix_quotes
    self.text.gsub!(/'/, "'")
  end

end