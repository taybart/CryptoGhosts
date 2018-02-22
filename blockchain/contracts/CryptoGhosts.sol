pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import './GhostMeta.sol';

contract CryptoGhosts is ERC721Token, TokenMeta {

  string constant private tokenName = "CryptoGhosts";
  string constant private tokenSymbol = "SPOOK";
  uint256 private tokenId = 1;

  // Only allow custodychain issuer
  modifier onlyIssuerOf(uint256 _tokenId) {
    require(tokenMeta[_tokenId].issuer == msg.sender);
      _;
  }

  function transferItem(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {

  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    // Check if _to is approved
    require(wList[_to]);
    // Make sure state is correct
    require(!tokenMeta[_tokenId].finished && tokenMeta[_tokenId].approved > 0);
    // Add transfer location to metadata
    transferLocations[_tokenId].push(Location({lat: _lat, long: _long}));
    // Add transfer time to metadata
    transferTimes[_tokenId].push(now);ќu
    // Transfer token
    super.transfer(_to, _tokenId);
    // Check if reciever is the original issuer
    if (tokenMeta[_tokenId].issuer == _to) {
      // Finish chain of custody
      endCustody(_tokenId);
    }
  }

  function name() pure public returns (string) {
    return tokenName;
  }
}

