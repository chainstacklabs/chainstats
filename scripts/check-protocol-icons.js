#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

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

const main = async () => {
  const { PRICING_CATALOG_URL, parsePricingCatalog } = await import(
    '../src/helpers/pricingCatalog.mjs'
  );
  const payload = await fetchJson(process.env.CHAINSTACK_CALC_API || PRICING_CATALOG_URL);
  const networks = parsePricingCatalog(payload);

  const iconKeys = extractIconKeys();
  const visibleProtocolNames = new Set(
    networks.map(({ protocol }) => formatProtocolDisplayName(protocol))
  );

  const fallbackNames = [...visibleProtocolNames]
    .filter((protocolName) => !iconKeys.has(protocolName))
    .sort();
  const mappedCount = visibleProtocolNames.size - fallbackNames.length;

  if (fallbackNames.length) {
    console.warn(`Fallback badges used for ${fallbackNames.join(', ')}.`);
  }

  console.log(
    `Custom icons available for ${mappedCount} of ${visibleProtocolNames.size} visible protocols.`
  );
};

main().catch((error) => {
  console.error(
    'Protocol icon check failed due to an invalid or unavailable API response.'
  );
  process.exitCode = 1;
});
