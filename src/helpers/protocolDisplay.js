import protocolMetadata from './protocolMetadata.json';

const {
  protocolDisplayNames,
  protocolSearchAliases = {},
  networkPrefixOverrides,
} = protocolMetadata;

const capitalizeFirstLetter = (value) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatProtocolDisplayName = (protocolSlug) => {
  if (!protocolSlug) {
    return '';
  }

  if (protocolDisplayNames[protocolSlug]) {
    return protocolDisplayNames[protocolSlug];
  }

  return capitalizeFirstLetter(protocolSlug);
};

const formatNetworkPrefix = (protocolSlug) => {
  if (!protocolSlug) {
    return '';
  }

  return networkPrefixOverrides[protocolSlug] || `${protocolSlug}-`;
};

const formatNetworkLabel = (networkName, protocolSlug) => {
  const cleanedLabel = networkName
    .replace(formatNetworkPrefix(protocolSlug), '')
    .replace(/[-–—]/g, ' ')
    .trim();

  const tokens = cleanedLabel.split(/\s+/).filter(Boolean);

  if (tokens.length > 1) {
    return tokens.filter((token) => token.toLowerCase() !== 'testnet').join(' ');
  }

  return cleanedLabel;
};

const formatNetworkDisplayName = (networkName, protocolSlug, nodeType) => {
  const networkLabel = formatNetworkLabel(networkName, protocolSlug);

  return capitalizeFirstLetter(`${networkLabel} ${nodeType}`.trim());
};

const getProtocolSearchAliases = (protocolSlug) => {
  const displayName = formatProtocolDisplayName(protocolSlug);
  const additionalAliases = protocolSearchAliases[protocolSlug] || [];

  const aliases = [
    protocolSlug,
    displayName,
    ...additionalAliases,
    displayName.replace(/\s+/g, ''),
    displayName.replace(/\s+/g, '-'),
    ...additionalAliases.map((alias) => alias.replace(/\s+/g, '')),
    ...additionalAliases.map((alias) => alias.replace(/\s+/g, '-')),
  ];

  return Array.from(
    new Set(
      aliases
        .filter(Boolean)
        .map((alias) => alias.toLowerCase())
    )
  );
};

export {
  formatProtocolDisplayName,
  formatNetworkLabel,
  formatNetworkDisplayName,
  getProtocolSearchAliases,
};
