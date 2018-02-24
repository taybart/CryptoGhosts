pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract GhostMeta is ERC721Token {
  struct Items {
    uint head;
    uint chest;
    uint face;
    uint leftHand;
    uint rightHand;
  }

  mapping (uint256 => Items) internal items;
  mapping (uint256 => string) internal ghostNames;
  mapping (uint256 => uint) internal bodyType;

  /* function getIssuer(uint256 _ghostId) public view returns (address) {
    return tokenMeta[_ghostId].issuer;
  } */
  function NameGhost(uint256 _ghostId, string name) public onlyOwnerOf(_ghostId) {
    ghostNames[_ghostId] = name;
  }
  function getGhostName(uint256 _ghostId) public view returns (string) {
    return ghostNames[_ghostId];
  }
  function getBodyType(uint256 _ghostId) public view returns (uint) {
    return bodyType[_ghostId];
  }
  function getEquippedItems(uint256 _ghostId) public view returns (uint, uint, uint, uint, uint) {
    return (items[_ghostId].head, items[_ghostId].chest, items[_ghostId].face,
            items[_ghostId].leftHand, items[_ghostId].rightHand);
  }
  function getHeadItem(uint256 _ghostId) public view returns (uint) {
    return items[_ghostId].head;
  }
  function getChestItem(uint256 _ghostId) public view returns (uint) {
    return items[_ghostId].chest;
  }
  function getFaceItem(uint256 _ghostId) public view returns (uint) {
    return items[_ghostId].face;
  }
  function getLeftHandItem(uint256 _ghostId) public view returns (uint) {
    return items[_ghostId].leftHand;
  }
  function getRightHandItem(uint256 _ghostId) public view returns (uint) {
    return items[_ghostId].rightHand;
  }
}

