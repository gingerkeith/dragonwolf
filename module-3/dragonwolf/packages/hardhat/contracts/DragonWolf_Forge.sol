// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "./DragonWolf.sol";

contract DragonWolf_Forge is DragonWolf {
    DragonWolf public tokenContract;

    constructor(address _tokenAddress) {
        tokenContract = DragonWolf(_tokenAddress);
    }

    function forge(uint256[] memory burnIds, uint256 burnAmount, uint256 _forgeId) external {
        require(_forgeId >= 3 && _forgeId <= 6, "Invalid forging token id");

        for (uint256 i = 0; i < burnIds.length; i++) {
            tokenContract.burn(msg.sender, burnIds[i], burnAmount);
        }
        
        tokenContract.mint(msg.sender, _forgeId, burnAmount);
        //emit event
    }
}