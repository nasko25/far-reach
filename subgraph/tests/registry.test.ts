import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CreatedAffiliate } from "../generated/schema"
import { CreatedAffiliate as CreatedAffiliateEvent } from "../generated/Registry/Registry"
import { handleCreatedAffiliate } from "../src/registry"
import { createCreatedAffiliateEvent } from "./registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let affiliateAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let affiliateName = "Example string value"
    let numberOfSales = BigInt.fromI32(234)
    let totalEarned = BigInt.fromI32(234)
    let newCreatedAffiliateEvent = createCreatedAffiliateEvent(
      id,
      affiliateAddress,
      affiliateName,
      numberOfSales,
      totalEarned
    )
    handleCreatedAffiliate(newCreatedAffiliateEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreatedAffiliate created and stored", () => {
    assert.entityCount("CreatedAffiliate", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreatedAffiliate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "affiliateAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreatedAffiliate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "affiliateName",
      "Example string value"
    )
    assert.fieldEquals(
      "CreatedAffiliate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "numberOfSales",
      "234"
    )
    assert.fieldEquals(
      "CreatedAffiliate",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalEarned",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
