pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './GhostMeta.sol';

contract CryptoGhosts is ERC721Token, Ownable, GhostMeta {

  string constant private tokenName = "CryptoGhosts";
  string constant private tokenSymbol = "SPOOK";
  uint256 private ghostId = 1;
  uint256 private itemId = 1;

  function CreateGhosts(uint256 amount, uint256 ghostType) public onlyOwner {
    for(uint i = 0; i < amount; i++) {
      _mint(msg.sender, ghostId);
      ghostNames[ghostId] = '';
      bodyType[ghostId] = ghostType;
      items[ghostId] = Items(0, 0, 0, 0, 0);
      ghostId++;
    }
  }

  function CreateGhosts(address account, uint256 amount, uint256 ghostType) public onlyOwner {
    for(uint i = 0; i < amount; i++) {
      _mint(account, ghostId);
      ghostNames[ghostId] = '';
      bodyType[ghostId] = ghostType;
      items[ghostId] = Items(0, 0, 0, 0, 0);
      ghostId++;
    }
  }

  function CreateItems(uint256 amount, uint256 itemType) public onlyOwner {
    for(uint i = 0; i < amount; i++) {
      _mint(msg.sender, itemId);
      bodyType[itemId] = itemType;
      itemId++;
    }
  }

  function getGhosts() public view returns (uint256[], uint[]) {
    uint256[] memory tokens = tokensOf(msg.sender);
    uint[] memory bodyTypes = new uint[](tokens.length);
    for (uint i = 0; i < tokens.length; i++) {
      bodyTypes[i] = getBodyType(tokens[i]);
    }
    return (tokens, bodyTypes);
  }

  function name() pure public returns (string) {
    return tokenName;
  }
}

