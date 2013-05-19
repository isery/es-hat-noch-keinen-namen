class CreateNames < ActiveRecord::Migration
  def change
    create_table :names do |t|
      t.integer :number
      t.string :name
      t.integer :sex
      t.integer :year

      t.timestamps
    end
  end
end
