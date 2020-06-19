const {scrapeDeals} = require("./dealsscraping");
const {writeDeals} = require("./cacheProvider");
const CronJob = require('cron').CronJob;

const job =  new CronJob('*/3 * * * * *', function() {
    scrapeDeals(1).then((data) =>{
        writeDeals(data)
    })
}, null, true, 'Europe/Paris', true);

exports.startDealsCron = () => {
    job.start()
}
