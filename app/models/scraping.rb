class Scraping
  def self.title_url(params)
    arry = []
    url = params["url"]
    agent = Mechanize.new
    current_page = agent.get(url)
    title = current_page.search('title').inner_text
    return title
  end

  def self.get_product(link)
    puts 'get movie information'
  end
end
