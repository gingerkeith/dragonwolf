// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract DragonWolf is ERC1155, ERC1155Burnable {
    using Strings for uint256;

    string public constant baseURL = "ipfs://QmT5xJxeuTiee6ZUdS9mTcJhyrmMG3N3fVQS2mhsUEZXC2/";
    string public constant name = "DragonWolf";
    string public constant symbol = "DW";


    constructor()
        ERC1155(baseURL)
    {}

    function mint(address to, uint256 tokenId, uint256 quantity) public {
        require(tokenId < 3, "Invalid minting token id");
        super._mint(to, tokenId, quantity, '');
    }

    function trade(uint256[] memory giveTokenId, uint256[] memory receiveTokenId, uint256[] memory amount) public {
        super._updateWithAcceptanceCheck(msg.sender, address(0), giveTokenId, amount, ""); //burn
        super._updateWithAcceptanceCheck(address(0), msg.sender, receiveTokenId, amount, ""); //mint
    }
    
    function tokenURI(uint256 _tokenId) public pure returns (string memory) {
        return string(abi.encodePacked(baseURL, _tokenId.toString()));
    }
}
