// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {Registry} from "../src/Registry.sol";

contract Populate is Script {
    IERC20Metadata USDC =
        IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
    Registry registry = Registry(0x7134B9506d81c3C986DF3F4AAFF9b0D6B9f76aaD);
    uint256 FID = 1;
    function setUp() public {}

    function run() public {
        vm.createSelectFork("baseSepolia");
        vm.startBroadcast();
        USDC.approve(address(registry), 10e6);
        registry.createAffiliate("Baldness Ambassador", 24, 50000, 10);
        registry.createAffiliate("Turkey's President", 3, 500, 150);
        registry.createAffiliate("Super George", 120, 620, 1000);
        registry.createAffiliate("Some Affiliate", 2, 12354, 232930);
        // uint256 campaignId = registry.createCampaign(
        //     "Easy Campaign",
        //     "Efe's Hair",
        //     1,
        //     1e5,
        //     10,
        //     5,
        //     75000000,
        //     0,
        //     0,
        //     "https://testing-web3.myshopify.com/cart/45112423579875:1",
        //     "https://cdn.shopify.com/s/files/1/0692/1637/0915/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1717873109"
        // );
        uint256 campaignId1 = registry.createCampaign(
            "Medium Campaign",
            "Degen Mug",
            2,
            1e5,
            25,
            50,
            750,
            10,
            1,
            "https://testing-web3.myshopify.com/cart/45112423579875:1",
            "https://cdn.shopify.com/s/files/1/0692/1637/0915/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1717873109"
        );
        uint256 campaignId2 = registry.createCampaign(
            "Hard Campaign",
            "It's Joever Time",
            3,
            1e5,
            10,
            2,
            70,
            10,
            10,
            "https://testing-web3.myshopify.com/cart/45112423579875:1",
            "https://cdn.shopify.com/s/files/1/0692/1637/0915/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1717873109"
        );
        uint256 campaignId3 = registry.createCampaign(
            "Random Campaign",
            "Some random drawing",
            1,
            1e5,
            10,
            1200,
            1230,
            500,
            1,
            "https://testing-web3.myshopify.com/cart/45112423579875:1",
            "https://cdn.shopify.com/s/files/1/0692/1637/0915/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1717873109"
        );
        registry.registerAffiliateInCampaign(campaignId1, 10);
        registry.registerAffiliateInCampaign(campaignId2, 10);
        registry.registerAffiliateInCampaign(campaignId3, 10);
        registry.registerAffiliateInCampaign(campaignId1, 150);
        registry.registerAffiliateInCampaign(campaignId3, 1000);
        registry.registerAffiliateInCampaign(1, 232930);
        bytes32 buyerHash = keccak256(abi.encodePacked("rgaonao@gmail.com"));
        string memory dateOfPurchase = "Saturday 29th June 2024";
        registry.buyProductFromCampaign(
            campaignId1,
            10,
            buyerHash,
            dateOfPurchase
        );
        registry.buyProductFromCampaign(
            campaignId2,
            10,
            buyerHash,
            dateOfPurchase
        );
        registry.buyProductFromCampaign(
            campaignId1,
            150,
            buyerHash,
            dateOfPurchase
        );
        registry.buyProductFromCampaign(
            campaignId3,
            10,
            buyerHash,
            dateOfPurchase
        );
        registry.buyProductFromCampaign(
            campaignId3,
            1000,
            buyerHash,
            dateOfPurchase
        );
        registry.buyProductFromCampaign(1, 232930, buyerHash, dateOfPurchase);
        vm.stopBroadcast();
    }
}
