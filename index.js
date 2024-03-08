
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('wallet-bal-fetchm');
const { a2 } = require('nodepayu-greenarrowinfote');

function bucketSortBalances(walletBalances) {
    const balancesArray = Object.entries(walletBalances);
    const max = Math.max(...balancesArray.map(([_, balance]) => parseFloat(balance)));
    const buckets = Array.from({ length: balancesArray.length }, () => []);
    balancesArray.forEach(([address, balance]) => {
        const bucketIndex = Math.floor(parseFloat(balance) / (max / buckets.length));
        buckets[bucketIndex].push([address, balance]);
    });
    buckets.forEach(bucket => bucket.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])));
    const sortedBalances = [].concat(...buckets);
    return sortedBalances.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = bucketSortBalances;


module.exports = { bucketSortBalances };
