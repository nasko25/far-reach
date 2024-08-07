// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Registry} from "../src/Registry.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IRegistry} from "../src/interfaces/IRegistry.sol";

contract RegistryTest is Test {
    Registry public registry;
    address affiliateAddress = vm.addr(0x123);
    uint256 affiliateFID = 10;
    address merchant = vm.addr(0x456);
    address buyer = vm.addr(0x789);
    IERC20Metadata USDC =
        IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);

    function setUp() public {
        vm.createSelectFork("baseSepolia", 11112043);
        registry = new Registry(address(USDC));
        deal(address(USDC), buyer, 100e6);
    }
    function test_createAffiliate() public {
        vm.prank(affiliateAddress);
        registry.createAffiliate("Affiliate 1", 7, 5000, affiliateFID);
        (
            uint256 FID,
            address currentAffiliateAddress,
            string memory name,
            uint256 sales,
            uint256 earned,
            uint256 postsLastWeek,
            uint256 followers
        ) = registry.affiliates(affiliateFID);
        assertEq(currentAffiliateAddress, affiliateAddress);
        assertEq(name, "Affiliate 1");
        assertEq(sales, 0);
        assertEq(earned, 0);
        assertEq(postsLastWeek, 7);
        assertEq(followers, 5000);
        assertEq(FID, 10);
    }

    function test_createMerchant() public {
        vm.prank(merchant);
        registry.createMerchant("Merchant 1");
        (
            uint256 id,
            address currentMerchantAddress,
            string memory name,
            uint256 sales,
            uint256 earned,
            uint256 paidToAffiliates
        ) = registry.merchants(merchant);
        assertEq(id, 1);
        assertEq(currentMerchantAddress, merchant);
        assertEq(name, "Merchant 1");
        assertEq(sales, 0);
        assertEq(earned, 0);
        assertEq(paidToAffiliates, 0);
    }

    function test_createCampaign() public {
        vm.startPrank(merchant);
        registry.createMerchant("Merchant 1");
        registry.createCampaign(
            "Campaign 1",
            "Degen T-Shirt",
            1,
            100e6,
            10,
            50,
            750,
            3000,
            5,
            "url",
            "imageUrl"
        );
        vm.stopPrank();
        (
            uint256 id,
            address merchantAddress,
            ,
            string memory productName,
            ,
            uint256 price,
            uint16 comission,
            ,
            ,
            ,
            ,
            ,
            ,
            address receiptAddress,

        ) = registry.campaigns(1);
        assertEq(id, 1);
        assertEq(merchantAddress, merchant);
        assertEq(productName, "Degen T-Shirt");
        assertEq(price, 100e6);
        assertEq(comission, 10);
        assertNotEq(receiptAddress, address(0));
    }

    function test_buyProductFromCampaign() public {
        vm.startPrank(merchant);
        registry.createMerchant("Merchant 1");
        uint256 campaignId = registry.createCampaign(
            "Campaign 1",
            "Degen T-Shirt",
            33333,
            100e6,
            10,
            50,
            750,
            3000,
            5,
            "url",
            "imageUrl"
        );
        vm.stopPrank();
        vm.prank(affiliateAddress);
        registry.createAffiliate("Affiliate 1", 7, 5000, affiliateFID);
        registry.registerAffiliateInCampaign(campaignId, affiliateFID);
        vm.startPrank(buyer);
        USDC.approve(address(registry), 100e6);
        bytes32 buyerHash = keccak256(abi.encodePacked("buyer@email.com"));
        string memory dateOfPurchase = "2021-10-10";
        registry.buyProductFromCampaign(
            campaignId,
            affiliateFID,
            buyerHash,
            dateOfPurchase
        );
        vm.stopPrank();
        (
            uint256 id,
            uint256 orderCampaignId,
            uint256 productId,
            uint256 orderAffiliateFID,
            address buyerAddress,
            uint256 price,
            uint256 comission,
            ,

        ) = registry.ordersForMerchants(merchant, 0);
        assertEq(id, 1);
        assertEq(buyerAddress, buyer);
        assertEq(orderAffiliateFID, affiliateFID);
        assertEq(orderCampaignId, campaignId);
        assertEq(productId, 33333);
        assertEq(price, 100e6);
        assertEq(comission, 10);
        assertEq(buyerHash, buyerHash);
        (
            ,
            ,
            ,
            uint256 sales,
            uint256 revenue,
            uint256 paidToAffiliates
        ) = registry.merchants(merchant);
        assertEq(sales, 1);
        assertEq(revenue, 81e6);
        assertEq(paidToAffiliates, 9e6);
        assertEq(USDC.balanceOf(merchant), 81e6);
        assertEq(USDC.balanceOf(affiliateAddress), 9e6);
        assertEq(USDC.balanceOf(address(registry)), 10e6);
        assertEq(USDC.balanceOf(buyer), 0);
        (, , , , , , , uint256 stock, , , , , , , ) = registry.campaigns(
            campaignId
        );
        assertEq(stock, 49);
    }

    function test_isRegisteredMerchant() public {
        vm.startPrank(merchant);
        registry.createMerchant("Merchant 1");
        vm.stopPrank();
        assert(registry.isRegisteredMerchant(merchant));
        assertFalse(registry.isRegisteredMerchant(affiliateAddress));
    }

    function test_isRegisteredAffiliate() public {
        vm.prank(affiliateAddress);
        registry.createAffiliate("Affiliate 1", 7, 5000, affiliateFID);
        assert(registry.isRegisteredAffiliate(affiliateFID));
    }

    function test_registerAffiliateInCampaign() public {
        vm.startPrank(merchant);
        registry.createMerchant("Merchant 1");
        uint256 campaignId = registry.createCampaign(
            "Campaign 1",
            "Degen T-Shirt",
            33333,
            100e6,
            10,
            50,
            750,
            3000,
            5,
            "url",
            "imageUrl"
        );
        vm.stopPrank();
        vm.prank(affiliateAddress);
        registry.createAffiliate("Affiliate 1", 7, 5000, affiliateFID);
        registry.registerAffiliateInCampaign(campaignId, affiliateFID);
        bool isAffiliateRegistered = registry.affiliatesInCampaigns(
            campaignId,
            affiliateFID
        );
        assertTrue(isAffiliateRegistered);
    }
}
