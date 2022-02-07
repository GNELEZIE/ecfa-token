import { Magic } from 'magic-sdk';
const BSCOptions = {
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/', // Smart Chain - Testnet RPC URL
    chainId: 97, // Smart Chain - Testnet chain id
  };
  
  // Setting network to Smart Chain - Testnet
  const magic = new Magic('pk_live_35896039660A9884', { network: BSCOptions });