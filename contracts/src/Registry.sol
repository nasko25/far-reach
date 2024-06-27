// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IRegistry} from "./interfaces/IRegistry.sol";
import {OwnableUpgradeable} from "@openzeppelin-contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin-contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin-contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
contract Registry is
    IRegistry,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    uint256 affiliateId = 1;
    uint256 merchantId = 1;
    uint256 orderId = 1;
    IERC20Metadata public transactionToken;
    uint16 farReachComission = 10;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _transactionToken) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        transactionToken = IERC20Metadata(_transactionToken);
    }

    mapping(address => Affiliate) public affiliates;
    mapping(address => Merchant) public merchants;
    mapping(uint256 => Product) public products;

    Product[] public allProducts;
    Order[] public allOrders;
    Affiliate[] public allAffiliates;
    Merchant[] public allMerchants;

    mapping(address => Order[]) public ordersForMerchants;

    function getAllProducts() public view returns (Product[] memory) {
        return allProducts;
    }

    function getAllOrders() public view returns (Order[] memory) {
        return allOrders;
    }

    function getAllAffiliates() public view returns (Affiliate[] memory) {
        return allAffiliates;
    }

    function getAllMerchants() public view returns (Merchant[] memory) {
        return allMerchants;
    }

    function isRegisteredMerchant(
        address merchantAddress
    ) public view returns (bool) {
        return merchants[merchantAddress].merchantAddress != address(0);
    }

    function isRegisteredAffiliate(
        address affiliateAddress
    ) public view returns (bool) {
        return affiliates[affiliateAddress].affiliateAddress != address(0);
    }

    function createAffiliate(string memory nickname) public {
        affiliates[msg.sender] = Affiliate(
            affiliateId,
            msg.sender,
            nickname,
            0,
            0
        );

        emit CreatedAffiliate(affiliateId, msg.sender, nickname, 0, 0);
        affiliateId++;
    }

    function createMerchant(string memory nickname) public {
        merchants[msg.sender] = Merchant(
            merchantId,
            msg.sender,
            nickname,
            0,
            0
        );
        emit CreatedMerchant(merchantId, msg.sender, nickname, 0, 0);
        merchantId++;
    }

    function registerProduct(
        string memory productName,
        uint256 price,
        uint16 comission
    ) public {
        require(
            merchants[msg.sender].merchantAddress != address(0),
            "Merchant not found"
        );
        products[currentProductId] = Product(
            currentProductId,
            msg.sender,
            productName,
            price,
            comission
        );

        emit RegisteredProduct(
            currentProductId,
            msg.sender,
            productName,
            price,
            comission
        );

        currentProductId++;
    }

    function buyProduct(uint256 productId, address affiliateAddress) public {
        require(
            productId <= currentProductId || productId == 0,
            "Product not found"
        );

        Product memory product = products[productId];
        Merchant memory merchant = merchants[product.merchantAddress];
        Affiliate memory affiliate = affiliates[affiliateAddress];

        require(merchant.merchantAddress != address(0), "Merchant not found");
        require(
            affiliate.affiliateAddress != address(0),
            "Affiliate not found"
        );

        require(
            transactionToken.balanceOf(msg.sender) >= product.price,
            "Insufficient funds"
        );

        transactionToken.transferFrom(msg.sender, address(this), product.price);

        uint256 amountAfterComission = (product.price *
            (100 - farReachComission)) / 100;
        uint256 amountForAffiliate = (amountAfterComission *
            product.comission) / 100;
        uint256 amountForMerchant = (amountAfterComission *
            (100 - product.comission)) / 100;

        transactionToken.transfer(merchant.merchantAddress, amountForMerchant);
        transactionToken.transfer(
            affiliate.affiliateAddress,
            amountForAffiliate
        );
        affiliate.numberOfSales++;
        affiliate.totalEarned += amountForAffiliate;
        merchant.numberOfSales++;
        merchant.totalEarned += amountForMerchant;

        ordersForMerchants[merchant.merchantAddress].push(
            Order(
                orderId,
                msg.sender,
                affiliateAddress,
                productId,
                product.price,
                product.comission
            )
        );

        emit CreatedOrder(
            orderId,
            msg.sender,
            affiliateAddress,
            productId,
            product.price,
            product.comission
        );
        orderId++;
    }

    /**
     * @notice Internal function to authorize a contract upgrade
     * @dev The function is a requirement for Openzeppelin's UUPS upgradeable contracts
     * @dev can only be called by the contract owner
     */
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
