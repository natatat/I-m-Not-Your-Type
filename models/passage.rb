class Passage < ActiveRecord::Base
  # validate :punctuation
  validates :text, presence: true
  validates :text, uniqueness: true
  validates :text, length: { minimum: 20, maximum: 250 }

  before_save :remove_trailing_spaces_and_quotes

  # def punctuation
  #   position = /'/ =~ text
  #   if position.class == Fixnum
  #     errors.add(:text, "not valid punctuation")
  #   end
  # end

  def remove_trailing_spaces_and_quotes
    self.gsub(/"/, "")
    self.gsub(/&nbsp;/, "")
  end

end