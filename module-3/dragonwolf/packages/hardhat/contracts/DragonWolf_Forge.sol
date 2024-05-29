// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "./DragonWolf.sol";

contract DragonWolf_Forge {// is Ownable2Step {
    DragonWolf public tokenContract;

    constructor(address _tokenAddress) {
        tokenContract = DragonWolf(_tokenAddress);
    }
    
    function forge(uint256[] memory burnIds, uint256[] memory burnAmounts, uint256 _forgeId) internal {
        require(_forgeId >= 3 && _forgeId <= 6, "Invalid token id");

        for (uint256 i = 0; i < burnIds.length; i++) {
            tokenContract.burn(msg.sender, burnIds[i], burnAmounts[i]);
        }
        
        tokenContract.mint(msg.sender, _forgeId, 1);
    }
}
