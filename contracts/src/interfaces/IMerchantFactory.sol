// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IMerchantFactory {
    function createMerchant(
        string memory name,
        address merchantOwner
    ) external returns (address);
}
