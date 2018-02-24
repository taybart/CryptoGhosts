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

  mapping (uint256 => Items) internal equippedItems;
  mapping (uint256 => string) internal ghostNames;
  mapping (uint256 => uint) internal bodyType;

 /* SETTERS */
  function NameGhost(uint256 _ghostId, string _name) public onlyOwnerOf(_ghostId) {
    ghostNames[_ghostId] = _name;
  }
  function EquipHeadItem(uint256 _ghostId, uint _item) public onlyOwnerOf(_ghostId) {
    equippedItems[_ghostId].head = _item;
  }

  /* GETTERS */
  function getGhostName(uint256 _ghostId) public view returns (string) {
    return ghostNames[_ghostId];
  }
  function getBodyType(uint256 _ghostId) public view returns (uint) {
    return bodyType[_ghostId];
  }
  function getHeadItem(uint256 _ghostId) public view returns (uint) {
    return equippedItems[_ghostId].head;
  }
  function getChestItem(uint256 _ghostId) public view returns (uint) {
    return equippedItems[_ghostId].chest;
  }
  function getFaceItem(uint256 _ghostId) public view returns (uint) {
    return equippedItems[_ghostId].face;
  }
  function getLeftHandItem(uint256 _ghostId) public view returns (uint) {
    return equippedItems[_ghostId].leftHand;
  }
  function getRightHandItem(uint256 _ghostId) public view returns (uint) {
    return equippedItems[_ghostId].rightHand;
  }
  function getEquippedItems(uint256 _ghostId) public view returns (uint, uint, uint, uint, uint) {
    return (equippedItems[_ghostId].head, equippedItems[_ghostId].chest, equippedItems[_ghostId].face,
            equippedItems[_ghostId].leftHand, equippedItems[_ghostId].rightHand);
  }
}

