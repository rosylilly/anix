require 'open-uri'

class Provider::Crawler::BandaiChannel
  BASE_URL = 'http://www.b-ch.com/'
  LIST_URL = 'http://www.b-ch.com/ttl/jpchar_list.php'
  IMG_URL = 'http://image.b-ch.com/tool/resize.php?pp=ttl2/%{id}/%{id}001a.jpg&ww=144&hh=80'

  def initialize
    @document = Nokogiri::HTML(open(LIST_URL, &:read))
  end
  attr_reader :document

  def products
    document.css('.ttl-list li').map do |program|
      link = program.css('a').first

      img_url = IMG_URL % { id: link['href'].strip.sub(/^.*\=/, '') }

      {
        title: link.text.strip,
        url: File.join(BASE_URL, link['href'].strip),
        provider: :bandai_channel,
        thumbnail_url: img_url,
        ppv: program.css('.only').empty?
      }
    end
  end

  def crawl!
    programs = products.map do |product|
      program = Program.where(url: product[:url]).first_or_initialize(product)
      program.assign_attributes(product)
      program
    end

    Program.import(programs, on_duplicate_key_update: %i(title ppv thumbnail_url))
  end
end
