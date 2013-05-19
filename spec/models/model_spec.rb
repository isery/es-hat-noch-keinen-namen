require 'spec_helper'

describe "Name" do

  it 'testing Model Name to be_a_new' do
    actual = Name.new(:name => "Alexander",:year => 2007, :sex => 1, :number => 20)
    expect(actual).to be_a_new(Name)
  end

  it 'testing names.search Method' do
    actual = Name.new(:id => 1, :name => "Name",:year => 2002, :number => 5, :sex => 1)
    expected = Name.search(1,1,10,"Name",2000,2011)
    Name.search(1,1,10,'E',2000,2011).should_not be nil
    expect(actual.name).to eq(expected.name)
    end

  it 'should find a Name in the database' do
    Name.new(:name => "Alexander",:year => 2007, :sex => 1, :number => 20)
    expected = Name.find_by_name('Alexander')
    expect(Name.first).to eq(expected)
  end

end