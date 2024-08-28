// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract H2VToken is ERC20, Ownable {

    struct TransferDetails {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    // Mapping from token ID to transfer details
    mapping (uint256 => TransferDetails[]) public transferHistory;

    // Event to log the transfer history
    event TransferRecorded(address indexed from, address indexed to, uint256 amount, uint256 timestamp);

    constructor(uint256 initialSupply) ERC20("H2VToken", "H2V") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        bool success = super.transfer(recipient, amount);
        if (success) {
            uint256 tokenId = totalSupply() - balanceOf(owner());
            transferHistory[tokenId].push(TransferDetails(msg.sender, recipient, amount, block.timestamp));
            emit TransferRecorded(msg.sender, recipient, amount, block.timestamp);
        }
        return success;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function getTransferHistory(uint256 tokenId) public view returns (TransferDetails[] memory) {
        return transferHistory[tokenId];
    }
}
