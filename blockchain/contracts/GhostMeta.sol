pragma solidity ^0.4.19;

contract GhostMeta {
  struct Items {
    uint head;
    uint chest;
    uint face;
    uint leftHand;
    uint rightHand;
  }

  mapping (uint256 => Items) internal items;
  mapping (uint256 => uint) internal bodyType;

  /* function getIssuer(uint256 _tokenId) public view returns (address) {
    return tokenMeta[_tokenId].issuer;
  } */
  function getIssuer(uint256 _tokenId) public view returns (uint) {
    return bodyType[_tokenId];
  }
  function getHeadItem(uint256 _tokenId) public view returns (uint) {
    return items[_tokenId].head;
  }
  function getChestItem(uint256 _tokenId) public view returns (uint) {
    return items[_tokenId].chest;
  }
  function getFaceItem(uint256 _tokenId) public view returns (uint) {
    return items[_tokenId].face;
  }
  function getLeftHandItem(uint256 _tokenId) public view returns (uint) {
    return items[_tokenId].leftHand;
  }
  function getRightHandItem(uint256 _tokenId) public view returns (uint) {
    return items[_tokenId].rightHand;
  }
}

