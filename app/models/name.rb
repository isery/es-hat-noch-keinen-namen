class Name < ActiveRecord::Base
	attr_accessible :name, :number, :sex, :year

	def self.search(category, lower_count, upper_count, start_letter, start_year, end_year)

		names = select('name,sex,sum(number) AS number').limit(30).order("number DESC").group("name")
						.where('name LIKE ?', (start_letter || 'A')+'%')
						.where('length(name) <= ?', (upper_count || 10).to_i)
						.where('length(name) >= ?', (lower_count || 3).to_i)
						.where('year >= ?', (start_year || 2000).to_i)
						.where('year <= ?', (end_year || 2011).to_i)

		if category == "2" || category == "1"
			names = names.where('sex = ?', category)
		end
		names

	end
end