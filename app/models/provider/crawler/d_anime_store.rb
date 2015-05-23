require 'open-uri'

class Provider::Crawler::DAnimeStore
  BASE_URL = 'https://anime.dmkt-sp.jp/animestore/'
  LIST_URL = 'https://anime.dmkt-sp.jp/animestore/c_all_pc?initialCollectionKey='

  def initialize
  end

  def products
    programs = []

    10.times do |n|
      doc = Nokogiri::HTML(open(LIST_URL + (n + 1).to_s, &:read))

      doc.css('.allWorksList a').each do |work|
        programs << {
          title: work.css('h2.movieTitleA').first.text.strip,
          url: File.join(BASE_URL, work['href'].strip),
          ppv: false, provider: :d_anime_store,
          thumbnail_url: work.css('.delayImg').first['data-img-src'].strip
        }
      end
    end

    programs
  end

  def crawl!
    programs = products.map do |product|
      program = Program.where(url: product[:url]).first_or_initialize(product)
      program.assign_attributes(product)
      program
    end

    Program.import(programs, on_duplicate_key_update: %i(title thumbnail_url))
  end
end
