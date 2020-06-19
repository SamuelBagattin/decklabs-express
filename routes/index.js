const express = require('express');
const {scrapeDeals} = require("../core/dealsscraping");
const router = express.Router();

const {getDeals} = require("../core/cacheProvider");
const {getConf} = require("../core/configurationProvider");

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = getDeals();
    res.render('index', {
        deals: data,
        title: "Decklabs",
        version: getConf()["releaseVersion"],
        production: getConf()["env"] === "prod"
    });
});

router.get('/api/page/:pagenumber', async (req, res) => {
    let data;
    const page = Number(req.params.pagenumber)
    if (page === 1) {
        data = getDeals();
    } else if (page > 1) {
        data = await scrapeDeals(page)
    } else {
        throw new Error(JSON.stringify({
            message: "invalid page number : " + page
        }));
    }

    res.send(data);
})

module.exports = router;
