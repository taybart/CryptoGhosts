const Web3 = require('web3');
const contract = require('truffle-contract');
const fs = require('fs');
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
let tId;

token.deployed()
  .then(instance => {
    deployedContract = instance;
    return deployedContract.tokensOf(accounts[0], { from: accounts[0], gas: 1000000 });
  })
  .then(() => deployedContract.CreateGhost(accounts[0], 0, 'Franky', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[0], 1, 'Bob', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[1], 2, 'Boo', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.EquipHeadItem(3, 1, { from: accounts[1], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[2], 0, '', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[2], 1, '', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[2], 2, '', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[3], 1, '', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateGhost(accounts[3], 1, '', { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateItems(accounts[0], 25000, 1, { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateItems(accounts[0], 25001, 1, { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateItems(accounts[0], 1, 1, { from: accounts[0], gas: 1000000 }))
  .then(() => deployedContract.CreateItems(accounts[1], 1, 1, { from: accounts[0], gas: 1000000 }))
  /* .then(() => deployedContract.ghostsOf(accounts[0], { from: accounts[0], gas: 1000000 }))
  .then((res) => console.log(res))
  .then(() => deployedContract.itemsOf(accounts[0], { from: accounts[0], gas: 1000000 }))
  .then((res) => console.log(res)) */
  .then(() => console.log('Finished setting up contract'))
  .catch(err => {
    console.log(err);
  });
