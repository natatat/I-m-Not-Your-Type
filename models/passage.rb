class Passage < ActiveRecord::Base
  validates :text, presence: true
  validates :text, uniqueness: true
  validates :text, length: { minimum: 20, maximum: 200 }
end