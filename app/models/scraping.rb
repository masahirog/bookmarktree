class Scraping
  def self.movie_urls(params)
    url = params["url"]
    agent = Mechanize.new
    current_page = agent.get(url)
    element = current_page.search('title')
    title = element.inner_text
    return title
  end

  def self.get_product(link)
    puts 'get movie information'
  end
end
