const PRICING_CATALOG_URL = 'https://static.chainstack.com/pricing/pricing_current.json';

const protocolSlugs = new Map([
  ['adi chain', 'adichain'],
  ['bnb smart chain', 'bsc'],
  ['gnosis chain', 'gnosis'],
  ['kaia', 'klaytn'],
  ['neo x', 'neox'],
  ['polygon', 'polygon-pos'],
  ['robinhood chain', 'robinhood'],
  ['x layer', 'xlayer'],
  ['xdc network', 'xdc'],
  ['xrp ledger', 'xrpl'],
  ['zksync era', 'zksync'],
]);

const parsePricingCatalog = (data) => {
  const blockchains = data?.blockchains;
  if (
    !blockchains ||
    typeof blockchains !== 'object' ||
    Array.isArray(blockchains)
  ) {
    throw new Error('Invalid Chainstack pricing catalog.');
  }

  const networks = new Map();

  for (const entry of Object.values(blockchains)) {
    if (!entry) continue;

    const { clouds, mode, total_storage_gb: size } = entry;
    const protocolName = entry.protocol?.name;
    const network = entry.network?.name;
    const client = entry.client?.name;

    if (
      !clouds ||
      typeof clouds !== 'object' ||
      !Object.keys(clouds).length ||
      (mode !== 'full' && mode !== 'archive') ||
      !Number.isFinite(size) ||
      size <= 0 ||
      typeof protocolName !== 'string' ||
      !protocolName.trim() ||
      !network ||
      !client
    ) {
      continue;
    }

    const name = protocolName.trim().toLowerCase();
    const protocol = protocolSlugs.get(name) || name.replace(/[^a-z0-9]+/g, '-');
    const networkKey = JSON.stringify([protocol, network]);

    if (!networks.has(networkKey)) {
      networks.set(networkKey, { protocol, network });
    }

    const networkData = networks.get(networkKey);
    const clients = networkData[mode] ??= [];
    const existing = clients.find(({ node_data }) => node_data.client === client);
    if (existing) {
      existing.node_data.size_required = Math.max(existing.node_data.size_required, size);
    } else {
      clients.push({ node_data: { client, size_required: size } });
    }
  }

  if (!networks.size) {
    throw new Error('No dedicated node sizes in the Chainstack pricing catalog.');
  }

  return [...networks.values()];
};

export { PRICING_CATALOG_URL, parsePricingCatalog };
