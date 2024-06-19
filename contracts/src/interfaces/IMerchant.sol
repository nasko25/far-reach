// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IMerchant {
    struct Campaign {
        uint256 id;
        string name;
        uint256 productId;
        uint256 price;
        uint16 comission;
        uint16 stock;
        uint128 minFID;
        uint128 minFollowers;
        uint128 minPostsLastWeek;
        string permalink;
        CampaignStatus status;
        address receiptAddress;
    }

    enum CampaignStatus {
        Active,
        Finished
    }

    function owner() external view returns (address);
    function name() external view returns (string memory);
    function createCampaign(
        string memory name,
        uint256 productId,
        uint256 price,
        uint16 comission,
        uint16 stock,
        uint128 minFID,
        uint128 minFollowers,
        uint128 minPostsLastWeek,
        string memory permalink
    ) external returns (address);
    function getNumberOfCampaigns() external view returns (uint256);
    function getCampaign(uint256 index) external view returns (address);
    function processOrder(address buyer, uint256 productId) external;
}