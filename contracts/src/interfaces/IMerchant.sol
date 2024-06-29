// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IMerchant {
    function updateRegistry(address _registry) external;
    function withdraw(uint256 amount) external;
}
