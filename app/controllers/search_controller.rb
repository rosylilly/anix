class SearchController < ApplicationController
  def index
    @programs = Program.all
  end
end
