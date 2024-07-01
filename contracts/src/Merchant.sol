// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IMerchant} from "./interfaces/IMerchant.sol";
import {Receipt} from "./Receipt.sol";
import {IPool} from "./interfaces/IPool.sol";

contract Merchant is IMerchant, Ownable {
    address public merchantOwner;
    IPool public seamlessPool;
    address public usdc;
    address public registry;

    modifier onlyRegistry() {
        require(msg.sender == registry, "Only registry can call this function");
        _;
    }

    constructor(address _pool, address _registry) Ownable(msg.sender) {
        seamlessPool = IPool(_pool);
        usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
        registry = _registry;
    }

    function updateRegistry(address _registry) external onlyOwner {
        registry = _registry;
    }

    function withdraw(uint256 amount) external onlyOwner {
        seamlessPool.withdraw(usdc, amount, address(this));
    }
}
