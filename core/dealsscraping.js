const cheerio = require('cheerio');

const fetch = require('node-fetch')

function getDeals($) {
    return $('article.thread.thread--type-list.thread--deal').toArray()
        .map((element) => {
                const el = $(element);
                return {
                    title: el.find('.thread-title>a').text().trim(),
                    price: el.find('.thread-price').text(),
                    temperature: el.find('.cept-vote-temp.vote-temp').text().trim(),
                    shipping: el.find('.cept-shipping-price>.hide--toW3').text().trim() || el.find('.cept-shipping-price').text().trim(),
                    retailer: el.find('.cept-merchant-name').text().trim(),
                    imageUrl: el.find('.threadGrid-image img').attr('src') || JSON.parse(el.find('.threadGrid-image img').attr('data-lazy-img') || '{}')["src"],
                    url: el.find('.cept-thread-image-link').attr('href')
                }
            }
        )

}
const scrapeDeals = async () => {

    const base_url = "https://www.dealabs.com/";
    const hot_url = "https://www.dealabs.com/hot"
    const new_url = "https://www.dealabs.com/nouveaux";
    const comment_url = "https://www.dealabs.com/commentes";


    const executeDealRequest = async (url) => {
        const res = await fetch(url);

        const html = await res.text();

        return getDeals(cheerio.load(html))
    };


    const deals = await Promise.all([
        executeDealRequest(base_url),
        executeDealRequest(hot_url),
        executeDealRequest(new_url),
        executeDealRequest(comment_url),
    ]);

    return {
        a_la_une: deals[0],
        hot: deals[1],
        new: deals[2],
        comment: deals[3],
    }

}

exports.scrapeDeals = scrapeDeals;
