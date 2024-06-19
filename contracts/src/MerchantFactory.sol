// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IMerchantFactory} from "./interfaces/IMerchantFactory.sol";
import {OwnableUpgradeable} from "@openzeppelin-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin-upgradeable/contracts/utils/ReentrancyGuardUpgradeable.sol";

contract MerchantFactory is
    IMerchantFactory,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    function createMerchant(
        string memory name,
        address merchantOwner
    ) external returns (address) {
        return address(0);
    }
    /**
     * @notice Internal function to authorize a contract upgrade
     * @dev The function is a requirement for Openzeppelin's UUPS upgradeable contracts
     * @dev can only be called by the contract owner
     */
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
