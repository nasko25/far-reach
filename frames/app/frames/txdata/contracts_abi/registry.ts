export const FAR_REACH_REGISTRY_ADDRESS =
  "0x71358C0E5caa12F23F62640ecA68361143e610DB";

export const storageRegistryABI = [
  {
    inputs: [
      { internalType: "address", name: "_transactionToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
    ],
    name: "CampaignEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "FID", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "affiliateAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "affiliateName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfSales",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalEarned",
        type: "uint256",
      },
    ],
    name: "CreatedAffiliate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "merchantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "comission",
        type: "uint16",
      },
      { indexed: false, internalType: "uint16", name: "stock", type: "uint16" },
      {
        indexed: false,
        internalType: "uint128",
        name: "maxFID",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minFollowers",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minPostsLastWeek",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "string",
        name: "permalink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productImage",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiptAddress",
        type: "address",
      },
    ],
    name: "CreatedCampaign",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "address",
        name: "merchantAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "merchantName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfSales",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalEarned",
        type: "uint256",
      },
    ],
    name: "CreatedMerchant",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "affiliateFID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "comission",
        type: "uint256",
      },
    ],
    name: "CreatedOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "affiliateFID",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "maxFID",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minFollowers",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "minPostsLastWeek",
        type: "uint128",
      },
    ],
    name: "RegisteredAffiliateInCampaign",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "affiliate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "totalEarned",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "numberOfSales",
        type: "uint256",
      },
    ],
    name: "TotalEarnedAffiliate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "merhcant",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "totalEarned",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "numberOfSales",
        type: "uint256",
      },
    ],
    name: "TotalEarnedMerchant",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "affiliates",
    outputs: [
      { internalType: "uint256", name: "FID", type: "uint256" },
      { internalType: "address", name: "affiliateAddress", type: "address" },
      { internalType: "string", name: "affiliateName", type: "string" },
      { internalType: "uint256", name: "numberOfSales", type: "uint256" },
      { internalType: "uint256", name: "totalEarned", type: "uint256" },
      { internalType: "uint256", name: "postsLastWeek", type: "uint256" },
      { internalType: "uint256", name: "followers", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "affiliatesInCampaigns",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "uint256", name: "FID", type: "uint256" },
      { internalType: "bytes32", name: "buyerHash", type: "bytes32" },
      { internalType: "string", name: "dateOfPurchase", type: "string" },
    ],
    name: "buyProductFromCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "campaigns",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "merchantAddress", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "productName", type: "string" },
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint16", name: "comission", type: "uint16" },
      { internalType: "uint16", name: "stock", type: "uint16" },
      { internalType: "uint128", name: "maxFID", type: "uint128" },
      { internalType: "uint128", name: "minFollowers", type: "uint128" },
      { internalType: "uint128", name: "minPostsLastWeek", type: "uint128" },
      { internalType: "string", name: "permalink", type: "string" },
      { internalType: "string", name: "productImage", type: "string" },
      { internalType: "address", name: "receiptAddress", type: "address" },
      {
        internalType: "enum IRegistry.CampaignStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "campaignsForMerchants",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "merchantAddress", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "productName", type: "string" },
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint16", name: "comission", type: "uint16" },
      { internalType: "uint16", name: "stock", type: "uint16" },
      { internalType: "uint128", name: "maxFID", type: "uint128" },
      { internalType: "uint128", name: "minFollowers", type: "uint128" },
      { internalType: "uint128", name: "minPostsLastWeek", type: "uint128" },
      { internalType: "string", name: "permalink", type: "string" },
      { internalType: "string", name: "productImage", type: "string" },
      { internalType: "address", name: "receiptAddress", type: "address" },
      {
        internalType: "enum IRegistry.CampaignStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "nickname", type: "string" },
      { internalType: "uint256", name: "postsLastWeek", type: "uint256" },
      { internalType: "uint256", name: "followers", type: "uint256" },
      { internalType: "uint256", name: "FID", type: "uint256" },
    ],
    name: "createAffiliate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_productName", type: "string" },
      { internalType: "uint256", name: "_productId", type: "uint256" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint16", name: "_comission", type: "uint16" },
      { internalType: "uint16", name: "_stock", type: "uint16" },
      { internalType: "uint128", name: "_maxFID", type: "uint128" },
      { internalType: "uint128", name: "_minFollowers", type: "uint128" },
      { internalType: "uint128", name: "_minPostsLastWeek", type: "uint128" },
      { internalType: "string", name: "_permalink", type: "string" },
      { internalType: "string", name: "_productImage", type: "string" },
    ],
    name: "createCampaign",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "nickname", type: "string" }],
    name: "createMerchant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "campaignId", type: "uint256" }],
    name: "endCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllAffiliates",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "FID", type: "uint256" },
          {
            internalType: "address",
            name: "affiliateAddress",
            type: "address",
          },
          { internalType: "string", name: "affiliateName", type: "string" },
          { internalType: "uint256", name: "numberOfSales", type: "uint256" },
          { internalType: "uint256", name: "totalEarned", type: "uint256" },
          { internalType: "uint256", name: "postsLastWeek", type: "uint256" },
          { internalType: "uint256", name: "followers", type: "uint256" },
        ],
        internalType: "struct IRegistry.Affiliate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllCampaigns",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "merchantAddress", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "productName", type: "string" },
          { internalType: "uint256", name: "productId", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint16", name: "comission", type: "uint16" },
          { internalType: "uint16", name: "stock", type: "uint16" },
          { internalType: "uint128", name: "maxFID", type: "uint128" },
          { internalType: "uint128", name: "minFollowers", type: "uint128" },
          {
            internalType: "uint128",
            name: "minPostsLastWeek",
            type: "uint128",
          },
          { internalType: "string", name: "permalink", type: "string" },
          { internalType: "string", name: "productImage", type: "string" },
          { internalType: "address", name: "receiptAddress", type: "address" },
          {
            internalType: "enum IRegistry.CampaignStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IRegistry.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMerchants",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "merchantAddress", type: "address" },
          { internalType: "string", name: "merchantName", type: "string" },
          { internalType: "uint256", name: "numberOfSales", type: "uint256" },
          { internalType: "uint256", name: "totalEarned", type: "uint256" },
        ],
        internalType: "struct IRegistry.Merchant[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOrders",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "uint256", name: "productId", type: "uint256" },
          { internalType: "uint256", name: "affiliateFID", type: "uint256" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          {
            internalType: "uint256",
            name: "affiliateComission",
            type: "uint256",
          },
          { internalType: "bytes32", name: "buyerHash", type: "bytes32" },
          {
            internalType: "enum IRegistry.OrderStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IRegistry.Order[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "merchantAddress", type: "address" },
    ],
    name: "getCampaignsForMerchant",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "merchantAddress", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "productName", type: "string" },
          { internalType: "uint256", name: "productId", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint16", name: "comission", type: "uint16" },
          { internalType: "uint16", name: "stock", type: "uint16" },
          { internalType: "uint128", name: "maxFID", type: "uint128" },
          { internalType: "uint128", name: "minFollowers", type: "uint128" },
          {
            internalType: "uint128",
            name: "minPostsLastWeek",
            type: "uint128",
          },
          { internalType: "string", name: "permalink", type: "string" },
          { internalType: "string", name: "productImage", type: "string" },
          { internalType: "address", name: "receiptAddress", type: "address" },
          {
            internalType: "enum IRegistry.CampaignStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IRegistry.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "merchantAddress", type: "address" },
    ],
    name: "getOrdersForMerchant",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "campaignId", type: "uint256" },
          { internalType: "uint256", name: "productId", type: "uint256" },
          { internalType: "uint256", name: "affiliateFID", type: "uint256" },
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "uint256", name: "price", type: "uint256" },
          {
            internalType: "uint256",
            name: "affiliateComission",
            type: "uint256",
          },
          { internalType: "bytes32", name: "buyerHash", type: "bytes32" },
          {
            internalType: "enum IRegistry.OrderStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct IRegistry.Order[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "affiliateFID", type: "uint256" },
    ],
    name: "isRegisteredAffiliate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "merchantAddress", type: "address" },
    ],
    name: "isRegisteredMerchant",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "merchants",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "merchantAddress", type: "address" },
      { internalType: "string", name: "merchantName", type: "string" },
      { internalType: "uint256", name: "numberOfSales", type: "uint256" },
      { internalType: "uint256", name: "totalEarned", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "numberOfCampaigns",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "numberOfOrders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "orders",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "affiliateFID", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "affiliateComission", type: "uint256" },
      { internalType: "bytes32", name: "buyerHash", type: "bytes32" },
      {
        internalType: "enum IRegistry.OrderStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "ordersForMerchants",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "uint256", name: "productId", type: "uint256" },
      { internalType: "uint256", name: "affiliateFID", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "affiliateComission", type: "uint256" },
      { internalType: "bytes32", name: "buyerHash", type: "bytes32" },
      {
        internalType: "enum IRegistry.OrderStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "campaignId", type: "uint256" },
      { internalType: "uint256", name: "FID", type: "uint256" },
    ],
    name: "registerAffiliateInCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "postsLastWeek", type: "uint256" },
      { internalType: "uint256", name: "followers", type: "uint256" },
      { internalType: "uint256", name: "FID", type: "uint256" },
    ],
    name: "syncAffiliate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionToken",
    outputs: [
      { internalType: "contract IERC20Metadata", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
