const CLIENT_DISPLAY_NAMES = {
  aldaba_light: 'Aldaba Light',
  'aptos-core': 'Aptos Core',
  'arc-node': 'Arc Node',
  'astar-collator': 'Astar Collator',
  avalanchego: 'AvalancheGo',
  bitcoind: 'Bitcoin Core',
  'cardano-node': 'Cardano Node',
  'cdk-erigon': 'CDK Erigon',
  'conduit-op-reth': 'Conduit OP Reth',
  'java-tron': 'java-tron',
  litecoind: 'Litecoin Core',
  'mind-nitro': 'Mind Nitro',
  nanoreth: 'NanoReth',
  'op-erigon': 'OP Erigon',
  'op-geth': 'OP Geth',
  'op-node': 'OP Node',
  'op-reth': 'OP Reth',
  pharos_light: 'Pharos Light',
  'plume-nitro': 'Plume Nitro',
  'stellar-core': 'Stellar Core',
  'sui-node': 'Sui Node',
  'taiko-geth': 'Taiko Geth',
  'tezos-node': 'Octez',
  xdc: 'XDC',
  xrpld: 'xrpld',
  zebrad: 'Zebra',
  'zkevm-node': 'zkEVM Node',
  zklink: 'zkLink',
  'zksync-era': 'ZKsync Era',
};

const formatClientName = (clientName = '') => {
  if (!clientName) {
    return '';
  }

  return (
    CLIENT_DISPLAY_NAMES[clientName] ||
    clientName.charAt(0).toUpperCase() + clientName.slice(1)
  );
};

export { formatClientName };
