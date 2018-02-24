pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './GhostMeta.sol';
import './ItemWallet.sol';

contract CryptoGhosts is ERC721Token, Ownable, GhostMeta, ItemWallet {
  string constant private tokenName = "CryptoGhosts";
  string constant private tokenSymbol = "SPOOK";
  uint256 private ghostId = 0;


  function CreateGhost(address _account, uint _ghostType, string _name) public onlyOwner {
    ghostId++;
    _mint(_account, ghostId);
    ghostNames[ghostId] = _name;
    bodyType[ghostId] = _ghostType;
    equippedItems[ghostId] = Items(0, 0, 0, 0, 0);
  }

  function CreateGhosts(address _account, uint _ghostType, string _name, uint256 _amount) public onlyOwner {
    for(uint i = 0; i < _amount; i++) {
      ghostId++;
      _mint(_account, ghostId);
      ghostNames[ghostId] = _name;
      bodyType[ghostId] = _ghostType;
      equippedItems[ghostId] = Items(0, 0, 0, 0, 0);
    }
  }

  function ghostsOf(address _account) public view returns (uint256[], uint[]) {
    uint256[] memory tkns = tokensOf(_account);
    uint[] memory bTypes = new uint[](tkns.length);
    for (uint i = 0; i < tkns.length; i++) {
      bTypes[i] = getBodyType(tkns[i]);
    }
    return (tkns, bTypes);
  }

  function name() pure public returns (string) {
    return tokenName;
  }
}

