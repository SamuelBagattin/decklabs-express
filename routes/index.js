const express = require('express');
const router = express.Router();

const {getDeals} = require("../core/cacheProvider");
const {getConf} = require("../core/configurationProvider");

/* GET home page. */
router.get('/', function(req, res, next) {
    const data = getDeals();
    res.render('index', {deals: data, title: "Decklabs", version: getConf()["releaseVersion"], production: app.get('env') === 'production', scriptName: 'index'});
});

router.get('/api', (req, res) => {
    const data = getDeals();
    res.send(data);
})

module.exports = router;
