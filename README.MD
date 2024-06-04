# Pixtochi Indexer

Welcome to the Pixtochi Indexer project! This project is based on the [Ponder framework](https://ponder.sh/docs/getting-started/new-project) and aims to provide a robust and scalable solution for your application needs.

## Project Structure


### Configuration Files

- **ponder.config.ts**: Main configuration for the Ponder framework.
- **ponder.config.testnet.ts**: Configuration for the testnet environment.
- **ponder.schema.ts**: Defines the database schema using Ponder's schema creation utilities.
- **ponder-env.d.ts**: Type definitions for Ponder's generated code.

### Source Files

- **src/PixotchiToken.ts**: Handles events related to the PixotchiToken contract.
- **src/PixotchiNFT.ts**: Handles events related to the PixotchiNFT contract.
- **src/Claimer.ts**: Handles events related to the Claimer contract (currently commented out).

### ABI Files

- **abis/PixotchiTokenAbi.ts**: ABI for the PixotchiToken contract.
- **abis/PixotchiNFT_0x4529Abi.ts**: ABI for the PixotchiNFT contract.
- **abis/PixotchiNFT_0xaeabAbi.ts**: ABI for another version of the PixotchiNFT contract.

## Configuration Details

### ponder.config.ts

Defines networks, contracts, and event filters. 

### ponder.schema.ts

Defines database tables and their schemas. 

### src/PixotchiToken.ts

Handles PixotchiToken events and updates the `Wallet` table.


### src/PixotchiNFT.ts

Handles PixotchiNFT events and updates various tables like `ItemConsumed`, `Mint`, `Played`, etc.


## Documentation

For detailed documentation, refer to the [Ponder documentation](https://ponder.sh/docs/getting-started/new-project).

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
