require 'open-uri'

class Provider::Crawler::BandaiChannel
  BASE_URL = 'http://www.b-ch.com/'
  LIST_URL = 'http://www.b-ch.com/ttl/jpchar_list.php'

  def initialize
    @document = Nokogiri::HTML(open(LIST_URL, &:read))
  end
  attr_reader :document

  def products
    document.css('.ttl-list li').map do |program|
      link = program.css('a').first

      {
        title: link.text.strip,
        url: File.join(BASE_URL, link['href'].strip),
        provider: :bandai_channel,
        ppv: program.css('.only').empty?
      }
    end
  end

  def crawl!
    products.each do |product|
      program = Program.where(url: product[:url]).first_or_create(product)
      program.update(product)
    end
  end
end
