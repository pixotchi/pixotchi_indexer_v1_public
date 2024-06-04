import { createSchema } from "@ponder/core";

export default createSchema((p) => ({

  Wallet: p.createTable({
    id: p.string(),
    spend: p.bigint(),
    lastUpdate: p.bigint(),
    fistUpdate: p.bigint(),
  }),

  WalletClaimed: p.createTable({
    id: p.string(),
    lastUpdate: p.bigint(),
    fistUpdate: p.bigint(),
    interactionCounter: p.bigint().optional(),
    nonce: p.bigint().optional(),
    claimedReferral: p.bigint().optional(),
    claimedAirdrop1: p.bigint().optional(),
    claimedAmountReferral: p.bigint().optional(),
  }),


  Attack: p.createTable({
    id: p.string(),
    attacker: p.bigint(),
    attackerName: p.string(),
    winner: p.bigint(),
    winnerName: p.string(),
    loser: p.bigint(),
    loserName: p.string(),
    scoresWon: p.bigint(),
    timestamp: p.bigint(),
  }),

  // Add new tables for each event
  ItemConsumed: p.createTable({
    id: p.string(),
    nftId: p.bigint(),
    nftName: p.string(),
    giver: p.string(),
    itemId: p.bigint(),
    timestamp: p.bigint(),
  }),

  Killed: p.createTable({
    id: p.string(),
    nftId: p.bigint(),
    deadId: p.bigint(),
    loserName: p.string(),
    reward: p.bigint(),
    killer: p.string(),
    winnerName: p.string(),
    timestamp: p.bigint(),
  }),

  Mint: p.createTable({
    id: p.string(),
    nftId: p.bigint(),
    timestamp: p.bigint(),
  }),

  Played: p.createTable({
    id: p.string(),
    nftId: p.bigint(),
    nftName: p.string(),
    points: p.bigint(),
    timeExtension: p.bigint(),
    timestamp: p.bigint(),
  }),


}));
