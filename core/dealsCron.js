const {scrapeDeals} = require("./dealsscraping");
const {setupDirectory, writeDeals} = require("./cacheProvider");
const CronJob = require('cron').CronJob;

const job =  new CronJob('*/3 * * * * *', function() {
    scrapeDeals().then((data) =>{
        writeDeals(JSON.stringify(data))
    })
}, null, true, 'Europe/Paris', true);

exports.startDealsCron = () => {
    setupDirectory()
    job.start()
}
