// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IRegistry} from "./interfaces/IRegistry.sol";
import {Receipt} from "./Receipt.sol";

contract Registry is IRegistry, Ownable {
    uint256 currentMerchantId = 1;
    uint256 currentOrderId = 1;
    uint256 currentCampaignId = 1;
    IERC20Metadata public transactionToken;
    uint16 farReachComission = 10;

    constructor(address _transactionToken) Ownable(msg.sender) {
        transactionToken = IERC20Metadata(_transactionToken);
    }

    mapping(uint256 => Affiliate) public affiliates;
    mapping(address => Merchant) public merchants;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Order) public orders;

    Campaign[] private allCampaigns;
    Order[] private allOrders;
    Affiliate[] private allAffiliates;
    Merchant[] private allMerchants;

    mapping(address => Order[]) public ordersForMerchants;
    mapping(address => Campaign[]) public campaignsForMerchants;

    mapping(uint256 => mapping(uint256 => bool)) public affiliatesInCampaigns;
    mapping(address => mapping(uint256 => uint256))
        public merchantPayoutForAffiliate;

    mapping(address => uint256) public numberOfCampaigns;
    mapping(address => uint256) public numberOfOrders;

    function getAllOrders() public view returns (Order[] memory) {
        Order[] memory orderArray = new Order[](allOrders.length);
        for (uint256 i = 0; i < allOrders.length; i++) {
            orderArray[i] = allOrders[i];
        }
        return orderArray;
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory campaignArray = new Campaign[](allCampaigns.length);
        for (uint256 i = 0; i < allCampaigns.length; i++) {
            campaignArray[i] = allCampaigns[i];
        }
        return campaignArray;
    }

    function getAllAffiliates() public view returns (Affiliate[] memory) {
        Affiliate[] memory affiliateArray = new Affiliate[](
            allAffiliates.length
        );
        for (uint256 i = 0; i < allAffiliates.length; i++) {
            affiliateArray[i] = allAffiliates[i];
        }
        return affiliateArray;
    }

    function getAllMerchants() public view returns (Merchant[] memory) {
        Merchant[] memory merchantArray = new Merchant[](allMerchants.length);
        for (uint256 i = 0; i < allMerchants.length; i++) {
            merchantArray[i] = allMerchants[i];
        }
        return merchantArray;
    }

    function getOrdersForMerchant(
        address merchantAddress
    ) public view returns (Order[] memory) {
        Order[] memory orderArray = new Order[](
            ordersForMerchants[merchantAddress].length
        );

        for (
            uint256 i = 0;
            i < ordersForMerchants[merchantAddress].length;
            i++
        ) {
            orderArray[i] = ordersForMerchants[merchantAddress][i];
        }

        return orderArray;
    }

    function getCampaignsForMerchant(
        address merchantAddress
    ) public view returns (Campaign[] memory) {
        Campaign[] memory campaignArray = new Campaign[](
            campaignsForMerchants[merchantAddress].length
        );

        for (
            uint256 i = 0;
            i < campaignsForMerchants[merchantAddress].length;
            i++
        ) {
            campaignArray[i] = campaignsForMerchants[merchantAddress][i];
        }

        return campaignArray;
    }

    function isRegisteredMerchant(
        address merchantAddress
    ) public view returns (bool) {
        return merchants[merchantAddress].merchantAddress != address(0);
    }

    function isRegisteredAffiliate(
        uint256 affiliateFID
    ) public view returns (bool) {
        return affiliates[affiliateFID].affiliateAddress != address(0);
    }

    function createAffiliate(
        string memory nickname,
        uint256 postsLastWeek,
        uint256 followers,
        uint256 FID
    ) external {
        require(
            affiliates[FID].affiliateAddress == address(0),
            "Affiliate already exists"
        );
        Affiliate memory affiliate = Affiliate(
            FID,
            msg.sender,
            nickname,
            0,
            0,
            postsLastWeek,
            followers
        );
        affiliates[FID] = affiliate;
        allAffiliates.push(affiliate);

        emit CreatedAffiliate(FID, msg.sender, nickname, 0, 0);
    }

    function syncAffiliate(
        uint256 postsLastWeek,
        uint256 followers,
        uint256 FID
    ) external {
        Affiliate memory affiliate = affiliates[FID];
        require(
            affiliate.affiliateAddress != address(0),
            "Affiliate not found"
        );
        affiliate.postsLastWeek = postsLastWeek;
        affiliate.followers = followers;
        affiliates[FID] = affiliate;
    }

    function registerAffiliateInCampaign(
        uint256 campaignId,
        uint256 FID
    ) external {
        require(
            campaignId <= currentCampaignId || campaignId == 0,
            "Campaign not found"
        );
        Affiliate memory affiliate = affiliates[FID];
        require(
            affiliate.affiliateAddress != address(0),
            "Affiliate not found"
        );

        Campaign memory campaign = campaigns[campaignId];

        require(
            affiliate.FID <= campaign.maxFID &&
                campaign.minFollowers <= affiliate.followers &&
                campaign.minPostsLastWeek <= affiliate.postsLastWeek,
            "Affiliate does not meet requirements"
        );

        require(
            !affiliatesInCampaigns[campaignId][affiliate.FID],
            "Affiliate already registered in campaign"
        );

        affiliatesInCampaigns[campaignId][affiliate.FID] = true;

        emit RegisteredAffiliateInCampaign(
            campaignId,
            affiliate.affiliateAddress,
            campaign.maxFID,
            campaign.minFollowers,
            campaign.minPostsLastWeek
        );
    }

    function createMerchant(string memory nickname) public {
        Merchant memory merchant = Merchant(
            currentMerchantId,
            msg.sender,
            nickname,
            0,
            0
        );
        merchants[msg.sender] = merchant;
        allMerchants.push(merchant);
        emit CreatedMerchant(currentMerchantId, msg.sender, nickname, 0, 0);
        currentMerchantId++;
    }

    function createCampaign(
        string memory _name,
        string memory _productName,
        uint256 _productId,
        uint256 _price,
        uint16 _comission,
        uint16 _stock,
        uint128 _maxFID,
        uint128 _minFollowers,
        uint128 _minPostsLastWeek,
        string memory _permalink,
        string memory _productImage
    ) external returns (uint256) {
        Merchant memory merchant = merchants[msg.sender];
        require(
            merchant.merchantAddress != address(0) &&
                merchant.merchantAddress == msg.sender,
            "Merchant not found or not authorized"
        );
        Receipt receipt = new Receipt(
            _productName,
            _price,
            merchant.merchantName,
            _stock
        );

        uint256 campaignId = currentCampaignId;

        Campaign memory campaign = Campaign(
            campaignId,
            msg.sender,
            _name,
            _productName,
            _productId,
            _price,
            _comission,
            _stock,
            _maxFID,
            _minFollowers,
            _minPostsLastWeek,
            _permalink,
            _productImage,
            address(receipt),
            CampaignStatus.Active
        );

        campaigns[campaignId] = campaign;
        allCampaigns.push(campaign);
        campaignsForMerchants[msg.sender].push(campaign);

        currentCampaignId++;

        emit CreatedCampaign(
            campaignId,
            msg.sender,
            _productName,
            _productId,
            _price,
            _comission,
            _stock,
            _maxFID,
            _minFollowers,
            _minPostsLastWeek,
            _permalink,
            _productImage,
            address(receipt)
        );

        return campaignId;
    }

    function endCampaign(uint256 campaignId) external {
        require(
            campaigns[campaignId].merchantAddress == msg.sender,
            "Merchant not authorized"
        );
        campaigns[campaignId].status = CampaignStatus.Finished;

        emit CampaignEnded(campaignId);
    }

    function buyProductFromCampaign(
        uint256 campaignId,
        uint256 FID,
        bytes32 buyerHash,
        string memory dateOfPurchase
    ) external {
        require(
            campaignId <= currentCampaignId || campaignId == 0,
            "Product not found"
        );
        Campaign memory campaign = campaigns[campaignId];
        require(campaign.stock > 0, "No stock left");

        Merchant memory merchant = merchants[campaign.merchantAddress];
        Affiliate memory affiliate = affiliates[FID];

        require(
            affiliate.affiliateAddress != address(0),
            "Affiliate not found"
        );
        require(
            affiliatesInCampaigns[campaignId][affiliate.FID],
            "Affiliate not registered in campaign"
        );

        require(
            transactionToken.balanceOf(msg.sender) >= campaign.price,
            "Insufficient funds"
        );

        transactionToken.transferFrom(
            msg.sender,
            address(this),
            campaign.price
        );

        emit PaymentMade(msg.sender, campaign.price);

        uint256 amountAfterComission = (campaign.price *
            (100 - farReachComission)) / 100;
        uint256 amountForAffiliate = (amountAfterComission *
            campaign.comission) / 100;
        uint256 amountForMerchant = (amountAfterComission *
            (100 - campaign.comission)) / 100;

        transactionToken.transfer(merchant.merchantAddress, amountForMerchant);
        transactionToken.transfer(
            affiliate.affiliateAddress,
            amountForAffiliate
        );
        affiliate.numberOfSales++;
        affiliate.totalEarned += amountForAffiliate;
        merchant.numberOfSales++;
        merchant.totalEarned += amountForMerchant;

        merchants[campaign.merchantAddress] = merchant;
        affiliates[FID] = affiliate;

        merchantPayoutForAffiliate[merchant.merchantAddress][
            FID
        ] += amountForAffiliate;
        emit TotalEarnedMerchant(
            merchant.merchantAddress,
            merchant.totalEarned,
            merchant.numberOfSales
        );
        emit TotalEarnedAffiliate(
            affiliate.affiliateAddress,
            affiliate.totalEarned,
            affiliate.numberOfSales
        );

        Order memory order = Order(
            currentOrderId,
            campaignId,
            campaign.productId,
            affiliate.FID,
            msg.sender,
            campaign.price,
            campaign.comission,
            buyerHash,
            OrderStatus.Pending
        );

        ordersForMerchants[merchant.merchantAddress].push(order);
        allOrders.push(order);
        orders[currentOrderId] = order;

        Receipt(campaign.receiptAddress).emitReceipt(
            msg.sender,
            dateOfPurchase
        );

        emit CreatedOrder(
            currentOrderId,
            campaignId,
            msg.sender,
            affiliate.FID,
            campaign.price,
            campaign.comission
        );
        currentOrderId++;
    }

    function withdrawRevenue() external onlyOwner {
        uint256 amount = transactionToken.balanceOf(address(this));
        require(amount > 0, "No revenue available");
        transactionToken.transfer(msg.sender, amount);
    }
}
