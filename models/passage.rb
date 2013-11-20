class Passage < ActiveRecord::Base
  # validate :punctuation
  validates :text, presence: true
  validates :text, uniqueness: true
  validates :text, length: { minimum: 20, maximum: 250 }

  # def punctuation
  #   position = /'/ =~ text
  #   if position.class == Fixnum
  #     errors.add(:text, "not valid punctuation")
  #   end
  # end

end