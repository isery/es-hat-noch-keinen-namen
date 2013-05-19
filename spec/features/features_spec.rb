require "spec_helper"

describe "About", :type => :feature, :js => true do
  
  it "is all about the Project" do
    visit '/'
    page.should have_content('ES HAT NOCH KEINEN NAMEN')
    page.find("#infoIconIndex").click
    page.should have_content('Georg Eschbacher')
    page.should have_content('data.gv.at')
  end

  it 'is now clicking on Back Button' do
    visit '/'
    page.should have_content('Folgende Namen wurden gefunden')
  end
end