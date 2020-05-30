var express = require('express');
var router = express.Router();

const cors = require('cors')({origin: true});
const scraping = require('../core/dealsscraping')

/* GET home page. */
router.get('/', function(req, res, next) {
  cors(req, res, async () => {


    const data = await scraping.scrapeDeals();
    res.render('index', data);

  },);
});

router.get('/api', (req, res) => {
  cors(req, res, async () => {


    const data = await scraping.scrapeDeals();
    res.send(data);

  },);
})

module.exports = router;
