// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IMerchantFactory} from "./interfaces/IMerchantFactory.sol";
import {Merchant} from "./Merchant.sol";
import {OwnableUpgradeable} from "@openzeppelin-contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin-contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin-contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract MerchantFactory is
    IMerchantFactory,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    address public merchantImplementation;

    event MerchantCreated(address merchant);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _merchantImplementation) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        merchantImplementation = _merchantImplementation;
    }

    function createMerchant(
        string memory name,
        address merchantOwner
    ) external override returns (address) {
        Merchant merchant = new Merchant(name, merchantOwner, address(this));
        emit MerchantCreated(address(merchant));
        return address(merchant);
    }

    /**
     * @notice Internal function to authorize a contract upgrade
     * @dev The function is a requirement for Openzeppelin's UUPS upgradeable contracts
     * @dev can only be called by the contract owner
     */
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
