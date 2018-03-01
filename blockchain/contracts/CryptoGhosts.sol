pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract CryptoGhosts is ERC721Token, Ownable {
  string constant private tokenName = "CryptoGhosts";
  string constant private tokenSymbol = "SPOOK";
  uint256 private ghostId = 0;
  uint256 private itemId = 1000000000;

  mapping (address => uint256[]) internal ownedGhosts;
  mapping (uint256 => uint) internal ghostType;

  mapping (address => uint256[]) internal ownedItems;
  mapping (uint256 => uint) internal itemmeta;

  function CreateGhosts(address _account, uint _ghostType, uint256 _amount) public onlyOwner {
    for(uint i = 0; i < _amount; i++) {
      ghostId++;
      _mint(_account, ghostId);
      ghostType[ghostId] = _ghostType;
      ownedGhosts[_account].push(ghostId);
    }
  }

  function typeOf(uint256 _ghostId) public view returns (uint) {
    return ghostType[_ghostId];
  }

  function ghostsOf(address _account) public view returns (uint256[], uint[]) {
    uint256[] memory ghts = ownedGhosts[_account];
    uint[] memory bTypes = new uint[](ghts.length);
    for (uint i = 0; i < ghts.length; i++) {
      bTypes[i] = ghostType[ghts[i]];
    }
    return (ghts, bTypes);
  }

  function CreateItems(address _account, uint _itemType, uint256 _amount) public onlyOwner {
    for(uint i = 0; i < _amount; i++) {
      itemId++;
      _mint(_account, itemId);
      itemmeta[itemId] = _itemType;
      ownedItems[_account].push(itemId);
    }
  }

  function itemsOf(address _account) public view returns (uint256[], uint[]) {
    uint256[] memory itms = ownedItems[_account];
    uint[] memory itTypes = new uint[](itms.length);
    for (uint i = 0; i < itms.length; i++) {
        itTypes[i] = itemmeta[itms[i]];
    }
    return (itms, itTypes);
  }

  function name() pure public returns (string) {
    return tokenName;
  }
}
