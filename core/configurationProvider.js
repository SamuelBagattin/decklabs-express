'use strict';

const fs = require('fs');

function getConf() {
    let rawdata = fs.readFileSync('conf.json');
    return JSON.parse(rawdata.toString());
}

exports.getConf = getConf
