// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract Hmt is ERC721PresetMinterPauserAutoId {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint data;

    constructor(string memory name, string memory symbol, string memory baseTokenURI)
        ERC721PresetMinterPauserAutoId(name, symbol, baseTokenURI)
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

       _setupRole(MINTER_ROLE, _msgSender());
       _setupRole(PAUSER_ROLE, _msgSender());

       mint(msg.sender);
    }

    function myMint() public {
        mint(msg.sender); // call inherited mint function, no tokenId in ret value
    }

    function updateData(uint _data) external {
        data = _data;
    }

    function readData() external view returns(uint) {
        return data;
    }
}