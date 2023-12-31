// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenURL;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("Funks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(
        bool isPublicMintEnabled_
    ) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenURL(string calldata baseTokenURL_) external onlyOwner {
        baseTokenURL = baseTokenURL_;
    }

    function tokenURI(
        uint256 tokenID_
    ) public view override returns (string memory) {
        require(_exists(tokenID_), "Token does not exsit!");
        return
            string(
                abi.encodePacked(
                    baseTokenURL,
                    Strings.toString(tokenID_),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed!");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "minting is not enabled!");
        require(msg.value == quantity_ * mintPrice, "wrong mint value!");
        require(totalSupply + quantity_ <= maxSupply, "sold out!");
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "exceed max wallet!"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
