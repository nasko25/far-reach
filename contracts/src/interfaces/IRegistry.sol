// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRegistry {
    struct Affiliate {
        uint256 id;
        address affiliateAddress;
        string affiliateName;
        uint256 numberOfSales;
        uint256 totalEarned;
    }

    struct Merchant {
        uint256 id;
        address merchantAddress;
        string merchantName;
        uint256 numberOfSales;
        uint256 totalEarned;
    }

    struct Product {
        uint256 id;
        address merchantAddress;
        string productName;
        uint256 price;
        uint16 comission;
    }

    struct Order {
        uint256 id;
        address buyer;
        address affiliateAddress;
        uint256 productId;
        uint256 price;
        uint256 comission;
    }

    event CreatedAffiliate(
        uint256 id,
        address indexed affiliateAddress,
        string affiliateName,
        uint256 numberOfSales,
        uint256 totalEarned
    );
    event CreatedMerchant(
        uint256 id,
        address merchantAddress,
        string merchantName,
        uint256 numberOfSales,
        uint256 totalEarned
    );
    event RegisteredProduct(
        uint256 id,
        address indexed merchantAddress,
        string productName,
        uint256 price,
        uint16 commission
    );
    event CreatedOrder(
        uint256 id,
        address indexed buyer,
        address indexed affiliateAddress,
        uint256 productId,
        uint256 price,
        uint256 comission
    );

    function number() external view returns (uint256);
    function setNumber(uint256 newNumber) external;
    function setName(string memory newName) external;
}
