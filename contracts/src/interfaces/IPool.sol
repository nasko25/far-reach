// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * Simple interface to interact with SeamlessProtocol
 */
interface IPool {
    /**
     * @dev Supply asset to the pool
     * @param asset Address of the asset to supply
     * @param amount Amount of asset to supply
     * @param onBehalfOf Address of the user on whose behalf the asset is supplied
     * @param referralCode Referral code of the user
     */
    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    /**
     * @dev Redeem asset from the pool
     * @param asset Address of the asset to redeem
     * @param amount Amount of asset to redeem
     * @param to Address of the user to receive the redeemed asset
     */
    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256);
}
