require 'test_helper'

class NameTest < ActiveSupport::TestCase

  test "search_by_name" do
	user = Name.create!(:name => "Edmund",:year => 2002, :number => 5, :sex => 1)
	expected = Name.search(1,1,10,'E',2000,2011)
    assert_equal user, Name.find_by_name("Edmund")
    assert_equal expected.first.name, Name.find_by_name("Edmund").name
  end
  #test "the truth" do
   #  assert true
  #end
end
