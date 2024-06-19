// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { Registry } from "../src/Registry.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import { IRegistry } from "../src/IRegistry.sol";

contract CounterTest is Test {
    Counter public counter;
    address affiliateAddress = vm.addr(0x123);
    address merchant = vm.addr(0x456);
    address buyer = vm.addr(0x789);
    IERC20Metadata USDC = IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);

    function setUp() public {
        vm.createSelectFork("baseSepolia", 11112043);
        counter = new Counter(address(USDC));
        counter.setNumber(0);
        deal(address(USDC), buyer, 100e6);
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function test_Decrement() public {
        counter.setNumber(10);
        counter.decrement();
        assertEq(counter.number(), 9);
    }

    function testFuzz_SetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }

    function test_createAffiliate() public {
        vm.prank(affiliateAddress);
        counter.createAffiliate("Affiliate 1");
        (
            uint256 id,
            address currentAffiliateAddress,
            string memory name,
            uint256 sales,
            uint256 earned
        ) = counter.affiliates(affiliateAddress);
        assertEq(id, 1);
        assertEq(currentAffiliateAddress, affiliateAddress);
        assertEq(name, "Affiliate 1");
        assertEq(sales, 0);
        assertEq(earned, 0);
    }

    function test_createMerchant() public {
        vm.prank(merchant);
        counter.createMerchant("Merchant 1");
        (
            uint256 id,
            address currentMerchantAddress,
            string memory name,
            uint256 sales,
            uint256 earned
        ) = counter.merchants(merchant);
        assertEq(id, 1);
        assertEq(currentMerchantAddress, merchant);
        assertEq(name, "Merchant 1");
        assertEq(sales, 0);
        assertEq(earned, 0);
    }

    function test_registerProduct() public {
        vm.startPrank(merchant);
        counter.createMerchant("Merchant 1");
        counter.registerProduct("Product 1", 100e6, 10);
        vm.stopPrank();
        (
            uint256 id,
            address merchantAddress,
            string memory productName,
            uint256 price,
            uint16 comission
        ) = counter.products(1);
        assertEq(id, 1);
        assertEq(merchantAddress, merchant);
        assertEq(productName, "Product 1");
        assertEq(price, 100e6);
        assertEq(comission, 10);
    }

    function test_buyProduct() public {
        vm.startPrank(merchant);
        counter.createMerchant("Merchant 1");
        counter.registerProduct("Product 1", 100e6, 10);
        vm.stopPrank();
        vm.prank(affiliateAddress);
        counter.createAffiliate("Affiliate 1");
        vm.startPrank(buyer);
        USDC.approve(address(counter), 100e6);
        counter.buyProduct(1, affiliateAddress);
        vm.stopPrank();
        (
            uint256 id,
            address buyerAddress,
            address currentAffiliateAddress,
            uint256 productId,
            uint256 price,
            uint256 comission
        ) = counter.ordersForMerchants(merchant, 0);
        assertEq(id, 1);
        assertEq(buyerAddress, buyer);
        assertEq(currentAffiliateAddress, affiliateAddress);
        assertEq(productId, 1);
        assertEq(price, 100e6);
        assertEq(comission, 10);
        assertEq(USDC.balanceOf(merchant), 81e6);
        assertEq(USDC.balanceOf(affiliateAddress), 9e6);
        assertEq(USDC.balanceOf(address(counter)), 10e6);
        assertEq(USDC.balanceOf(buyer), 0);
    }

    function test_isRegisteredMerchant() public {
        vm.startPrank(merchant);
        counter.createMerchant("Merchant 1");
        vm.stopPrank();
        assert(counter.isRegisteredMerchant(merchant));
        assertFalse(counter.isRegisteredMerchant(affiliateAddress));
    }

    function test_isRegisteredAffiliate() public {
        vm.prank(affiliateAddress);
        counter.createAffiliate("Affiliate 1");
        assert(counter.isRegisteredAffiliate(affiliateAddress));
    }
}
