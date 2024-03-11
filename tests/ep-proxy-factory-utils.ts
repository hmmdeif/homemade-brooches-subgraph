import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Created } from "../generated/EPProxyFactory/EPProxyFactory"

export function createCreatedEvent(
  sender: Address,
  owner: Address,
  proxy: Address
): Created {
  let createdEvent = changetype<Created>(newMockEvent())

  createdEvent.parameters = new Array()

  createdEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("proxy", ethereum.Value.fromAddress(proxy))
  )

  return createdEvent
}
