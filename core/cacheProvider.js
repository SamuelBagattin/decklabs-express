let deals;

exports.writeDeals = (dealsObject) => {
    deals = dealsObject
}

exports.getDeals = () => {
    return deals;
}
