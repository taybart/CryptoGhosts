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

token.deployed()
  .then(instance => {
    const contractjson = new Buffer(JSON.stringify({ contractAddress: instance.address }));
    fs.open('../ui/src/json/contract-address.json', 'w', (err, fd) => {
      fs.write(fd, contractjson, 0, contractjson.length, null, err => {
        fs.close(fd, () => {
          console.log('Wrote to file');
        });
      });
    });
  });


