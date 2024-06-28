// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IMerchantFactory} from "./interfaces/IMerchantFactory.sol";
import {Merchant} from "./Merchant.sol";

contract MerchantFactory is IMerchantFactory {
    address public merchantImplementation;

    event MerchantCreated(address merchant);
    constructor(address _merchantImplementation) {
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
}
