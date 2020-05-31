const fs = require('fs');
const dataDir = './data';
const dataFile = dataDir + '/deals.json'

exports.setupDirectory = () => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
}

exports.writeDeals = (dealsAsJsonString) => {
    fs.writeFileSync(dataFile, dealsAsJsonString);
}

exports.getDeals = () => {
    return fs.readFileSync(dataFile).toString()
}
