// eslint-disable-next-line no-undef
const CryptoGhosts = artifacts.require("./CryptoGhosts.sol");

module.exports = deployer => {
  deployer.deploy(CryptoGhosts);
};

