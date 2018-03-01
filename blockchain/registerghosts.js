const Web3 = require('web3');
const contract = require('truffle-contract');
const fs = require('fs');
const axios = require('axios');
const CryptoGhosts = require('./build/contracts/CryptoGhosts.json');
const keys = require('./keys.json');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');

const token = contract(CryptoGhosts);
token.setProvider(provider);

token.currentProvider.sendAsync = function () {
  return token.currentProvider.send.apply(token.currentProvider, arguments);
};

const accounts = Object.keys(keys.addresses);
let deployedContract = null;

token.deployed()
  .then(instance => {
    deployedContract = instance;
  })
  .then(() => {
    const ghostIds = [];
    Promise.all(accounts.map(a =>
      deployedContract.tokensOf(a, { from: accounts[0], gas: 1000000 }))
    ).then(results => {
      results.forEach(r => {
        const tIds = r.toString(1).split(',');
        tIds.forEach(id => {
          if (id < 1000000000) {
            // console.log(id);
            ghostIds.push(+id);
          }
      });
      });
    })
    .then(() => {
      // console.log(ghostIds);
      Promise.all(ghostIds.map(ghostId =>
        axios.post('http://localhost:3001/ghost/register', { ghostId })
      ));
    })
  })
