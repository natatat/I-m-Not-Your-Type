require 'spec_helper'

describe Passage do
  context "checking validations" do
    it { should validate_presence_of :text }
    it { should validate_uniqueness_of :text }
    it { should allow_value("*"*19 + "hey there").for :text }
    it { should_not allow_value("*"*19).for :text }
    it { should_not allow_value("*"*251).for :text }
    it { should_not allow_value("It's").for :text }
    it { should_not allow_value("*"*19 + "It's").for :text }
    # it { should_not allow_value("*"*19 + " ").for :text }
    # it { should_not allow_value(" " + "*"*19).for :text }
  end
end