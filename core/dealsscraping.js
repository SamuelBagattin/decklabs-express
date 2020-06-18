const cheerio = require('cheerio');

const fetch = require('node-fetch')

function getDeals($) {
    return $('article.thread.thread--type-list.thread--deal').toArray()
        .map((element) => {
                const el = $(element);
                return {
                    title: el.find('.thread-title>a').text().trim(),
                    price: el.find('.thread-price').text(),
                    usualPrice: el.find('.threadGrid-title>.overflow--fade .mute--text.text--lineThrough').text().trim(),
                    discount: el.find('.threadGrid-title>.overflow--fade .space--ml-1.size--all-l.size--fromW3-xl').text().trim(),
                    description: (() => {
                        let descriptionEl = el.find('.threadGrid-body>.userHtml.userHtml-content>.cept-description-container');
                        descriptionEl.find('a').remove();
                        return descriptionEl.text().trim()
                    })(),
                    temperature: el.find('.cept-vote-temp.vote-temp').text().trim(),
                    shipping: el.find('.cept-shipping-price>.hide--toW3').text().trim() || el.find('.cept-shipping-price').text().trim(),
                    retailer: el.find('.cept-merchant-name').text().trim(),
                    imageUrl: el.find('.threadGrid-image img').attr('src') || JSON.parse(el.find('.threadGrid-image img').attr('data-lazy-img') || '{}')["src"],
                    url: el.find('.cept-thread-image-link').attr('href'),
                    reporter: el.find('.thread-username').text().trim(),
                    reporterImageUrl: el.find('.thread-avatar').attr('src').trim(),
                    comments: Number(el.find('.cept-comment-link>span').text().trim()),
                    updateDate: el.find('.icon--activity').siblings('.hide--fromW3').text().trim(),
                    location: el.find('.icon--location').siblings('.hide--fromW3').text().trim(),
                    shippingCountry: el.find('.icon--world').siblings('.hide--fromW3').text().trim(),
                    expirationDate: el.find('.icon--hourglass').siblings('.hide--fromW3').text().trim(),
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
