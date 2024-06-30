// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {Registry} from "../src/Registry.sol";

contract BuyProduct is Script {
    IERC20Metadata USDC =
        IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
    Registry registry = Registry(0x5E848fff72A92D5837DdA15B9d3384448C742b7E);
    uint256 campaignId = 1;
    uint256 affiliateFID = 1;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("baseSepolia");
        vm.startBroadcast();
        USDC.approve(address(registry), 10e6);
        bytes32 buyerHash = keccak256(abi.encodePacked("rgaonao@gmail.com"));
        string memory dateOfPurchase = "Saturday 29th June 2024";
        registry.buyProductFromCampaign(
            campaignId,
            affiliateFID,
            buyerHash,
            dateOfPurchase
        );
        vm.stopBroadcast();
    }
}
