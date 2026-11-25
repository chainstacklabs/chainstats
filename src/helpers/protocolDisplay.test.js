import { describe, expect, it } from 'vitest';
import {
  formatNetworkDisplayName,
  formatProtocolDisplayName,
  getProtocolSearchAliases,
} from './protocolDisplay';

describe('protocolDisplay', () => {
  it('formats known protocol slugs to display names', () => {
    expect(formatProtocolDisplayName('bsc')).toBe('BNB Smart Chain');
    expect(formatProtocolDisplayName('klaytn')).toBe('Kaia');
    expect(formatProtocolDisplayName('megaeth')).toBe('MegaETH');
    expect(formatProtocolDisplayName('xrpl')).toBe('XRP Ledger');
    expect(formatProtocolDisplayName('zksync')).toBe('ZKsync Era');
  });

  it('formats unknown protocol slugs by capitalizing', () => {
    expect(formatProtocolDisplayName('unichain')).toBe('Unichain');
  });

  it('formats network labels from protocol prefix and node type', () => {
    expect(formatNetworkDisplayName('bsc-mainnet', 'bsc', 'full')).toBe(
      'Mainnet full'
    );
    expect(
      formatNetworkDisplayName('polygon-zkevm-testnet', 'polygon-zkevm', 'archive')
    ).toBe('Testnet archive');
    expect(
      formatNetworkDisplayName('ethereum-sepolia-testnet', 'ethereum', 'archive')
    ).toBe('Sepolia archive');
    expect(
      formatNetworkDisplayName('tron-nile-testnet', 'tron', 'full')
    ).toBe('Nile full');
    expect(
      formatNetworkDisplayName('bitcoin-signet-testnet', 'bitcoin', 'full')
    ).toBe('Signet full');
    expect(
      formatNetworkDisplayName('bitcoin-testnet4', 'bitcoin', 'full')
    ).toBe('Testnet 4 full');
  });

  it('creates search aliases for slug and display variants', () => {
    expect(getProtocolSearchAliases('bsc')).toEqual(
      expect.arrayContaining([
        'bsc',
        'bnb smart chain',
        'bnbsmartchain',
        'bnb-smart-chain'
      ])
    );
    expect(getProtocolSearchAliases('klaytn')).toEqual(
      expect.arrayContaining(['klaytn', 'kaia'])
    );
  });
});
