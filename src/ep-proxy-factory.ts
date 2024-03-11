import { Created as CreatedEvent } from "../generated/EPProxyFactory/EPProxyFactory"
import { Created } from "../generated/schema"

export function handleCreated(event: CreatedEvent): void {
  let entity = new Created(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.owner = event.params.owner
  entity.proxy = event.params.proxy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
