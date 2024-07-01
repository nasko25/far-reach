export const contractAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_transactionToken",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "affiliates",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "FID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "affiliateAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "affiliateName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "postsLastWeek",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "followers",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "affiliatesInCampaigns",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "buyProductFromCampaign",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "FID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "buyerHash",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "dateOfPurchase",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "campaigns",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "comission",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "stock",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "maxFID",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "minFollowers",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "minPostsLastWeek",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "permalink",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productImage",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "receiptAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum IRegistry.CampaignStatus"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "campaignsForMerchants",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "comission",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "stock",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "maxFID",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "minFollowers",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "minPostsLastWeek",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "permalink",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "productImage",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "receiptAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum IRegistry.CampaignStatus"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createAffiliate",
        "inputs": [
            {
                "name": "nickname",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "postsLastWeek",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "followers",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "FID",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createCampaign",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_productName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_price",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_comission",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "_stock",
                "type": "uint16",
                "internalType": "uint16"
            },
            {
                "name": "_maxFID",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "_minFollowers",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "_minPostsLastWeek",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "_permalink",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_productImage",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createMerchant",
        "inputs": [
            {
                "name": "nickname",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "endCampaign",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getAllAffiliates",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Affiliate[]",
                "components": [
                    {
                        "name": "FID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "affiliateAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "affiliateName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "numberOfSales",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalEarned",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "postsLastWeek",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "followers",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllCampaigns",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Campaign[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "merchantAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "comission",
                        "type": "uint16",
                        "internalType": "uint16"
                    },
                    {
                        "name": "stock",
                        "type": "uint16",
                        "internalType": "uint16"
                    },
                    {
                        "name": "maxFID",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "minFollowers",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "minPostsLastWeek",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "permalink",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productImage",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "receiptAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IRegistry.CampaignStatus"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllMerchants",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Merchant[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "merchantAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "merchantName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "numberOfSales",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalEarned",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalPaidToAffiliates",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllOrders",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Order[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "campaignId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "productId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "affiliateFID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "buyer",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "affiliateComission",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "buyerHash",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IRegistry.OrderStatus"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCampaignsForMerchant",
        "inputs": [
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Campaign[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "merchantAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "comission",
                        "type": "uint16",
                        "internalType": "uint16"
                    },
                    {
                        "name": "stock",
                        "type": "uint16",
                        "internalType": "uint16"
                    },
                    {
                        "name": "maxFID",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "minFollowers",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "minPostsLastWeek",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "permalink",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "productImage",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "receiptAddress",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IRegistry.CampaignStatus"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getOrdersForMerchant",
        "inputs": [
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct IRegistry.Order[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "campaignId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "productId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "affiliateFID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "buyer",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "price",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "affiliateComission",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "buyerHash",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IRegistry.OrderStatus"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isRegisteredAffiliate",
        "inputs": [
            {
                "name": "affiliateFID",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isRegisteredMerchant",
        "inputs": [
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "merchantPayoutForAffiliate",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "merchants",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "merchantAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "merchantName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "totalPaidToAffiliates",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ordersForMerchants",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "campaignId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "productId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "affiliateFID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "buyer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "price",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "affiliateComission",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "buyerHash",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum IRegistry.OrderStatus"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "registerAffiliateInCampaign",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "FID",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "syncAffiliate",
        "inputs": [
            {
                "name": "postsLastWeek",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "followers",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "FID",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transactionToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IERC20Metadata"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "withdrawRevenue",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "CampaignEnded",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CreatedAffiliate",
        "inputs": [
            {
                "name": "FID",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "affiliateAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "affiliateName",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CreatedCampaign",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "merchantAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "productName",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "productId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "comission",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            },
            {
                "name": "stock",
                "type": "uint16",
                "indexed": false,
                "internalType": "uint16"
            },
            {
                "name": "maxFID",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "minFollowers",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "minPostsLastWeek",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "permalink",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "productImage",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "receiptAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "status",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum IRegistry.CampaignStatus"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CreatedMerchant",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "merchantAddress",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "merchantName",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CreatedOrder",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "campaignId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "buyer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "buyerHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "affiliateFID",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "price",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "comission",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum IRegistry.OrderStatus"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PaymentMade",
        "inputs": [
            {
                "name": "customer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RegisteredAffiliateInCampaign",
        "inputs": [
            {
                "name": "campaignId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "affiliateFID",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "maxFID",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "minFollowers",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            },
            {
                "name": "minPostsLastWeek",
                "type": "uint128",
                "indexed": false,
                "internalType": "uint128"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TotalEarnedAffiliate",
        "inputs": [
            {
                "name": "affiliate",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TotalEarnedMerchant",
        "inputs": [
            {
                "name": "merhcant",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalEarned",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "numberOfSales",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
];