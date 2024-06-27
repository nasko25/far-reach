// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IMerchant} from "./interfaces/IMerchant.sol";
import {Receipt} from "./Receipt.sol";
import {IPool} from "./interfaces/IPool.sol";

contract Merchant is IMerchant, Ownable {
    address public registry;
    address public merchantOwner;
    string public name;
    IPool public seamlessPool;
    address public usdc;

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    modifier onlyRegistry() {
        require(msg.sender == registry, "Only registry can call this function");
        _;
    }

    constructor(
        string memory _name,
        address _pool,
        address _registry
    ) Ownable(msg.sender) {
        name = _name;
        seamlessPool = IPool(_pool);
        usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
        registry = _registry;
    }

    function updateRegistry(address _registry) external onlyOwner {
        registry = _registry;
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

        return address(receipt);
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
        uint256 revenue,
        string memory date
    ) external onlyRegistry {
        require(campaigns[productId].stock > 0, "No stock left");
        Campaign storage campaign = campaigns[productId];
        Receipt(campaign.receiptAddress).emitReceipt(buyer, date);
        seamlessPool.supply(usdc, revenue, address(this), 0);
    }
}
