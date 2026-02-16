#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_URL =
  process.env.CHAINSTACK_CALC_API ||
  'https://console.chainstack.com/api/core/v1/calc/';

const projectRoot = path.resolve(__dirname, '..');
const protocolMetadataPath = path.join(
  projectRoot,
  'src',
  'helpers',
  'protocolMetadata.json'
);
const protocolIconPath = path.join(
  projectRoot,
  'src',
  'components',
  'ProtocolIcon',
  'ProtocolIcon.jsx'
);

const protocolMetadata = JSON.parse(fs.readFileSync(protocolMetadataPath, 'utf8'));

// Keep this in sync with src/helpers/protocolDisplay.js for script-only runtime usage.
const capitalizeFirstLetter = (value) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatProtocolDisplayName = (protocolSlug) => {
  if (protocolMetadata.protocolDisplayNames[protocolSlug]) {
    return protocolMetadata.protocolDisplayNames[protocolSlug];
  }

  return capitalizeFirstLetter(protocolSlug);
};

const extractIconKeys = () => {
  const fileContent = fs.readFileSync(protocolIconPath, 'utf8');
  const iconMatches = fileContent.matchAll(/^\s*(['A-Za-z0-9\s.-]+):\s*</gm);

  return new Set(
    Array.from(iconMatches).map((match) =>
      match[1].replace(/^'/, '').replace(/'$/, '')
    )
  );
};

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const client = target.protocol === 'http:' ? http : https;

    client
      .get(target, (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(
            new Error(
              `Unexpected status ${response.statusCode} from ${target.origin}`
            )
          );
          response.resume();
          return;
        }

        let rawData = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => (rawData += chunk));
        response.on('end', () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', (error) => reject(error));
  });
};

const getVisibleProtocolDisplayNames = (protocols) => {
  const visibleProtocols = new Set();

  Object.entries(protocols).forEach(([protocolSlug, networks]) => {
    Object.values(networks).forEach((networkData) => {
      if (networkData && networkData.dedicated) {
        const hasPublicNode = ['full', 'archive'].some((nodeType) => {
          const nodes = networkData.dedicated[nodeType];

          if (!nodes) {
            return false;
          }

          return Object.values(nodes).some((nodeConfig) => {
            const sizeRequired = nodeConfig?.node_info?.storage?.size_required;
            return nodeConfig?.type === 'public' && sizeRequired != null;
          });
        });

        if (hasPublicNode) {
          visibleProtocols.add(formatProtocolDisplayName(protocolSlug));
        }
      }
    });
  });

  return visibleProtocols;
};

const main = async () => {
  const payload = await fetchJson(API_URL);
  const protocols = payload?.Enterprise?.protocols;

  if (!protocols) {
    throw new Error('Unexpected API response: missing Enterprise.protocols');
  }

  const iconKeys = extractIconKeys();
  const visibleProtocolNames = getVisibleProtocolDisplayNames(protocols);

  const missingIconProtocols = Array.from(visibleProtocolNames)
    .filter((protocolName) => !iconKeys.has(protocolName))
    .sort();

  if (missingIconProtocols.length) {
    console.error('Protocol icons missing for one or more visible protocols.');
    process.exitCode = 1;
    return;
  }

  console.log(
    `Protocol icon check passed for ${visibleProtocolNames.size} visible protocols`
  );
};

main().catch((error) => {
  console.error(
    'Protocol icon check failed due to an invalid or unavailable API response.'
  );
  process.exitCode = 1;
});
