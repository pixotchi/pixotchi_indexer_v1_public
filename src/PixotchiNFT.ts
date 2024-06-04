import {ponder} from "@/generated";



ponder.on("PixotchiNFT:AdminChanged", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("PixotchiNFT:Upgraded", async ({ event, context }) => {
  console.log(event.args);
});




// Generic function to get a single plant name
// @ts-ignore
async function getPlantName(client, PixotchiNFT, input: bigint): Promise<string> {
  try {
    const result = await client.readContract({
      abi: PixotchiNFT.abi,
      address: PixotchiNFT.address,
      functionName: "plantName",
      args: [input],
    });
    return result ? result : `Plant #${input}`;
  } catch (error) {
    console.error("Error reading from the contract:", error);
    return  `Plant #${input}`;
  }
}

// Generic function to get multiple plant names
// @ts-ignore
async function getPlantsName(client, PixotchiNFT, inputs: bigint[]): Promise<string[]> {
  try {
    const contractCalls = inputs.map(input => ({
      abi: PixotchiNFT.abi,
      address: PixotchiNFT.address,
      functionName: 'plantName',
      args: [input]
    }));

    const output = await client.multicall({
      contracts: contractCalls
    });

    // @ts-ignore
    output.filter(obj => obj.status === 'failure').forEach(obj => console.error(obj.error));
    // @ts-ignore
    //return output.map((obj, index) => obj.status === 'success' ? obj.result : `Plant #${inputs[index]}`);
    return output.map((obj, index) =>
        obj.status === 'success'
            ? obj.result
            : obj.result === ''
                ? `Plant #${inputs[index]}`
                : `Plant #${inputs[index]}` // Fallback for any failures or empty results
    );
  } catch (error) {
    console.error("Error reading from the contract:", error);
    return inputs.map(input => `Plant #${input}`);
  }
}

ponder.on("PixotchiNFT:ItemConsumed", async ({ event, context }) => {
  const { ItemConsumed } = context.db;

  const { client } = context;
  const { PixotchiNFT } = context.contracts;
  const plantName = await getPlantName(client, PixotchiNFT, event.args.nftId);


  await ItemConsumed.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      nftId: event.args.nftId,
      giver: event.args.giver,
      itemId: event.args.itemId,
        nftName: plantName,
    }
  });
});


// ponder.on("PixotchiNFT:Pass", async ({ event, context }) => {
//   const { Pass } = context.db;
//
//   await Pass.create({
//     id: event.log.transactionHash,
//     data: {
//       timestamp: event.block.timestamp,
//       from: event.args.from,
//       to: event.args.to,
//     }
//   });
// });

ponder.on("PixotchiNFT:Mint", async ({ event, context }) => {
  const { Mint } = context.db;

  await Mint.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      nftId: event.args.id,
    }
  });
});


ponder.on("PixotchiNFT:Played", async ({ event, context }) => {
  const { Played } = context.db;
  const { client } = context;
  const { PixotchiNFT } = context.contracts;
  const plantName = await getPlantName(client, PixotchiNFT, event.args.id);


  await Played.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      nftId: event.args.id,
      points: event.args.points,
      timeExtension: event.args.timeExtension,
        nftName: plantName,
    }
  });
});

ponder.on("PixotchiNFT:PlayedV2", async ({ event, context }) => {
  const { Played } = context.db;
  const { client } = context;
  const { PixotchiNFT } = context.contracts;
  const plantName = await getPlantName(client, PixotchiNFT, event.args.id);


  await Played.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      nftId: event.args.id,
      points: event.args.points,
      timeExtension: event.args.timeExtension,
      nftName: plantName,
    }
  });
});




// ponder.on("PixotchiNFT:RedeemRewards", async ({ event, context }) => {
//   const { RedeemRewards } = context.db;
//
//   await RedeemRewards.create({
//     id: event.log.transactionHash,
//     data: {
//       timestamp: event.block.timestamp,
//       nftId: event.args.id,
//       reward: event.args.reward,
//     }
//   });
// });





ponder.on("PixotchiNFT:Attack", async ({ event, context }) => {
  const { Attack } = context.db;
  const { client } = context;
  const { PixotchiNFT } = context.contracts;

  const plantNames = await getPlantsName(client, PixotchiNFT, [event.args.attacker, event.args.winner, event.args.loser]);


  await Attack.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      attacker: event.args.attacker,
        winner: event.args.winner,
        loser: event.args.loser,
        scoresWon: event.args.scoresWon,
      attackerName: plantNames[0] ?? `Plant #${event.args.attacker}`,
      winnerName: plantNames[1] ?? `Plant #${event.args.winner}`,
      loserName: plantNames[2] ?? `Plant #${event.args.loser}`,
    }
  });
});


ponder.on("PixotchiNFT:Killed", async ({ event, context }) => {
  const { Killed } = context.db;
  //const { client } = context;
  //const { PixotchiNFT } = context.contracts;

  //const plantNames = await getPlantsName(client, PixotchiNFT, [event.args., event.args.winner, event.args.loser]);


  await Killed.create({
    id: event.log.transactionHash,
    data: {
      timestamp: event.block.timestamp,
      winnerName: event.args.winnerName,
      nftId: event.args.nftId,
      deadId: event.args.deadId,
      killer: event.args.killer,
      loserName: event.args.loserName,
        reward: event.args.reward,

    }
  });
});
