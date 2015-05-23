class SearchController < ApplicationController
  def index
    @programs = Program.all.map do |program|
      json = program.as_json

      json['thumbnail_url'] = camo(program.thumbnail_url) if(ENV['CAMO_HOST'] && ENV['CAMO_KEY'])

      json
    end
  end
end
