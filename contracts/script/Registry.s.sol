// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {Registry} from "../src/Registry.sol";

contract CounterScript is Script {
    IERC20Metadata USDC =
        IERC20Metadata(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
    function setUp() public {}

    function run() public {
        vm.createSelectFork("baseSepolia");
        vm.startBroadcast();
        Counter counter = new Counter(address(USDC));
        counter.setNumber(0);
        counter.setName("Counter");
        counter.createAffiliate("0xDegenAffiliate");
        vm.stopBroadcast();
    }
}
