require 'spec_helper'

describe Passage do
  context "checking validations" do
    it { should validate_presence_of :text }
    it { should validate_uniqueness_of :text }
    it { should allow_value("*"*19 + "hey there").for :text }
    it { should_not allow_value("*"*19).for :text }
    it { should_not allow_value("*"*251).for :text }
  end

  context "#remove_trailing_spaces" do
    it "should remove remove trailing spaces" do
        passage = Passage.new(text: "The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time), am here at DBC at 8:58 (DBC clock time), take a nap sometime between 12:30 and 8:00 pm, then stay up until 2 AM (when DBC's alarms go on), and go to bed. ")
        passage.save
        (passage.text).should eq("The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time), am here at DBC at 8:58 (DBC clock time), take a nap sometime between 12:30 and 8:00 pm, then stay up until 2 AM (when DBC's alarms go on), and go to bed.")
    end

    it "should remove remove trailing &nbsp;" do
        passage = Passage.new(text: "The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time), am here at DBC at 8:58 (DBC clock time), take a nap sometime between 12:30 and 8:00 pm, then stay up until 2 AM (when DBC's alarms go on), and go to bed.&nbsp;")
        passage.save
        (passage.text).should eq("The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time), am here at DBC at 8:58 (DBC clock time), take a nap sometime between 12:30 and 8:00 pm, then stay up until 2 AM (when DBC's alarms go on), and go to bed.")
    end
  end

  # context "#fix_punctuation" do
  #   it "should replace special character apostrophes 1" do
  #     passage = Passage.new(text: "The Non-Tech Stuff:I think I’m becoming nocturnal. I wake up at 8:40(iPhone clock time)")
  #     passage.save
  #     (passage.text).should eq("The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)")
  #   end
  #   it "should replace special character apostrophes 2" do
  #     passage = Passage.new(text: "The Non-Tech Stuff:I think I‘m becoming nocturnal. I wake up at 8:40(iPhone clock time)")
  #     passage.save
  #     (passage.text).should eq("The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)")
  #   end
  #   it "should replace special character quotes" do
  #     passage = Passage.new(text: "“The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)”")
  #     passage.save
  #     (passage.text).should eq("\"The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)\"")
  #   end
  #   it "should replace special character apostrophes ellipses" do
  #     passage = Passage.new(text: "The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)…")
  #     passage.save
  #     (passage.text).should eq("The Non-Tech Stuff:I think I'm becoming nocturnal. I wake up at 8:40(iPhone clock time)...")
  #   end
  # end
end