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

    function name() external view returns (string memory);
    function createCampaign(
        string memory name,
        string memory productName,
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
    function getCampaign(uint256 index) external view returns (Campaign memory);
    function processOrder(
        address buyer,
        uint256 productId,
        uint256 revenue
    ) external;
}
