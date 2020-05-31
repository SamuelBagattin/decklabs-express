const express = require('express');
const router = express.Router();

const cors = require('cors')({origin: true});
const scraping = require('../core/dealsscraping')
const {getConf} = require("../core/configurationProvider");

/* GET home page. */
router.get('/', function(req, res, next) {
  cors(req, res, async () => {


    const data = await scraping.scrapeDeals();
    res.render('index', {deals: data, title: "Decklabs", version: getConf()["releaseVersion"]});

  },);
});

router.get('/api', (req, res) => {
  cors(req, res, async () => {


    const data = await scraping.scrapeDeals();
    res.send(data);

  },);
})

module.exports = router;
