// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IMerchant} from "./interfaces/IMerchant.sol";
import {Receipt} from "./Receipt.sol";
import {IPool} from "./interfaces/IPool.sol";

contract Merchant is IMerchant {
    address public owner;
    string public name;
    IPool public seamlessPool;
    address public usdc;

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    constructor(string memory _name, address _owner, address _pool) {
        name = _name;
        owner = _owner;
        seamlessPool = IPool(_pool);
        usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    }

    function createCampaign(
        string memory _name,
        string memory _productName,
        uint256 _productId,
        uint256 _price,
        uint16 _comission,
        uint16 _stock,
        uint128 _minFID,
        uint128 _minFollowers,
        uint128 _minPostsLastWeek,
        string memory _permalink
    ) external returns (address) {
        Receipt receipt = new Receipt(_productName, _price, name, _stock);

        campaigns[numberOfCampaigns] = Campaign(
            numberOfCampaigns++,
            _name,
            _productId,
            _price,
            _comission,
            _stock,
            _minFID,
            _minFollowers,
            _minPostsLastWeek,
            _permalink,
            CampaignStatus.Active,
            address(receipt)
        );
    }

    function getNumberOfCampaigns() external view returns (uint256) {
        return numberOfCampaigns;
    }

    function getCampaign(
        uint256 index
    ) external view returns (Campaign memory) {
        return campaigns[index];
    }

    function processOrder(
        address buyer,
        uint256 productId,
        uint256 revenue
    ) external {
        require(campaigns[productId].stock > 0, "No stock left");
        Campaign storage campaign = campaigns[productId];
        Receipt(campaign.receiptAddress)._safeMint(buyer, tokenId);
        seamlessPool.supply(usdc, revenue, address(this), 0);
    }
}
