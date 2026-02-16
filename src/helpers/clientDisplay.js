const CLIENT_DISPLAY_NAMES = {
  bitcoind: 'Bitcoin Core',
  'zkevm-node': 'zkEVM Node',
  avalanchego: 'AvalancheGo',
  'tezos-node': 'Octez',
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
