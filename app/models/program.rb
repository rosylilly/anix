class Program < ActiveRecord::Base
  def title=(text)
    text = Moji.normalize_zen_han(text)
    text = cleanup_title(text)
    write_attribute(:title, text)
  end

  private

  def cleanup_title(text)
    text.sub(/【フジテレビオンデマンド】$/, '').sub(/#{Regexp.escape('[TVシリーズ]')}$/, '').sub(/【日テレオンデマンド】$/, '')
  end
end
