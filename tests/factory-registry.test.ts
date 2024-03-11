import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Created } from "../generated/schema"
import { Created as CreatedEvent } from "../generated/FactoryRegistry/FactoryRegistry"
import { handleCreated } from "../src/factory-registry"
import { createCreatedEvent } from "./factory-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let proxy = Address.fromString("0x0000000000000000000000000000000000000001")
    let proxyId = BigInt.fromI32(234)
    let newCreatedEvent = createCreatedEvent(sender, owner, proxy, proxyId)
    handleCreated(newCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Created created and stored", () => {
    assert.entityCount("Created", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proxy",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proxyId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
