// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; // DO I NEED THIS?
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract DragonWolf is ERC1155, ERC1155Burnable {
    using Strings for uint256;

    address public forgerAddr;
    string public constant baseURL = "ipfs://QmT5xJxeuTiee6ZUdS9mTcJhyrmMG3N3fVQS2mhsUEZXC2/";
    string public constant name = "DragonWolf";
    string public constant symbol = "DW";


    constructor(address _forger)
        ERC1155(baseURL)
        // Ownable(initialOwner)
    {
        forgerAddr = _forger; //what?
    }

    // function setURI(string memory newuri) public onlyOwner {
    //     _setURI(newuri);
    // } //I don't understand what this fn does or why we need it?

    function mint(address to, uint256 tokenId, uint256 quantity) public {
        super._mint(to, tokenId, quantity, '');
    }

    // function _forge(uint256 _tokenId, )

    function tokenURI(uint256 _tokenId) public pure returns (string memory) {
        return string(abi.encodePacked(baseURL, _tokenId.toString()));
    }
}
