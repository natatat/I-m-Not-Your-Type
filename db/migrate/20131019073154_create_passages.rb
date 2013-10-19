class CreatePassages < ActiveRecord::Migration
  def up
    create_table :passages do |t|
      t.string :text
      t.string :author

      t.timestamps
    end
  end

  def down
    drop_table :passages
  end
end
