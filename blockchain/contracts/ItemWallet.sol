pragma solidity ^0.4.19;
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract ItemWallet is ERC721Token, Ownable {
  uint256 private itemId = 0;
  uint256 private totalItems;
  mapping (uint256 => address) private itemOwner;
  mapping (address => uint256[]) internal ownedItems;
  mapping(uint256 => uint256) private ownedItemIndex;
  mapping (uint256 => uint) internal itemTypes;

  function CreateItems(address _to, uint256 _itemType, uint256 _amount) onlyOwner public {
    for(uint i = 0; i < _amount; i++) {
      itemId++;
      uint256 length = balanceOf(_to);
      ownedItemIndex[itemId] = length;
      itemTypes[itemId] = _itemType;
      itemOwner[itemId] = _to;
      ownedItems[_to].push(itemId);
      totalItems = totalItems.add(1);
    }
  }

  function getItemType(uint256 _itemId) public view returns(uint) {
    return itemTypes[_itemId];
  }

  function itemsOf(address _account) public view returns(uint256[]) {
    return ownedItems[_account];
  }
  function itemTypesOf(address _account) public view returns(uint256[]) {
    uint256[] memory itms = new uint256[](ownedItems[_account].length);
    for(uint i = 0; i < ownedItems[_account].length; i++) {
      itms[i] = itemTypes[ownedItems[_account][i]];
    }
    return itms;
  }
}
