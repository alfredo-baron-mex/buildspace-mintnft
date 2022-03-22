# Buildspace Course
## Mint your own NFT collection and ship a Web3 app to show them off

Use of an NFT fullstack application

The project let users connect their Ethereum wallet, and mint an NFT to their wallet so they actually own it. They'll even be able to re-sell the NFT on OpenSea. The NFT itself can be customized to whatever you want.

### React App Part

Create a `.env` file on root of the project with these lines:

- `RINKEBY_ALCHEMY_DEV_KEY = `'Your Alchemy App API Key for Testnet'
- `RINKEBY_ALCHEMY_PROD_KEY = `'Your Alchemy App API Key for Mainnet'
- `PRIVATE_KEY = `'Your Metamask private key'

### Configuration ⚙️

1. Put the deployed smart contract reference inside `App.js` in `CONTRACT_ADDRESS`
2. Put the **ABI** part of the smart contract into `utils` folder. Remember to check the import part in `App.js` to point to the right file.

### Important 🔥

Every time the smart contract be deployed, is needed to change the ***Configuration*** part with the new smart contract deployed references.

