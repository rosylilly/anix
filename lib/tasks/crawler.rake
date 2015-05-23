namespace :crawler do
  task :all do
    Provider::Crawler::BandaiChannel.new.crawl!
    Provider::Crawler::DAnimeStore.new.crawl!
  end

  desc 'バンダイチャンネルをクロール'
  task :bandai_channel do
    Provider::Crawler::BandaiChannel.new.crawl!
  end

  desc 'Dアニメストアをクロール'
  task :d_anime_store do
    Provider::Crawler::DAnimeStore.new.crawl!
  end
end
