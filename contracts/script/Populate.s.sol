// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {Registry} from "../src/Registry.sol";

contract Populate is Script {
    IERC20Metadata USDC =
        IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
    Registry registry = Registry(0x5F9487E70894799A00A899B8F7d9148E01ADDf57);
    uint256 FID = 10;
    function setUp() public {}

    function run() public {
        vm.createSelectFork("baseSepolia");
        vm.startBroadcast();
        registry.createAffiliate("Ducke Affiliate", 7, 5000, FID);
        registry.createMerchant("Ducke Merchant");
        uint256 campaignId = registry.createCampaign(
            "Campaign 1",
            "Hydrogen Ski",
            1,
            1e6,
            10,
            5,
            750,
            1000,
            2,
            "https://testing-web3.myshopify.com/cart/45112423579875:1",
            "https://cdn.shopify.com/s/files/1/0692/1637/0915/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1717873109"
        );
        registry.registerAffiliateInCampaign(campaignId, FID);
        vm.stopBroadcast();
    }
}
