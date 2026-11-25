import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import processData from './getData';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

const catalogEntry = (overrides = {}) => ({
  protocol: { name: 'Polygon', title: 'Polygon' },
  network: { name: 'polygon-pos-mainnet', title: 'Mainnet' },
  client: { name: 'bor', title: 'Bor' },
  mode: 'full',
  clouds: { example: {} },
  total_storage_gb: 850,
  storage_package_gb: 20,
  ...overrides,
});

describe('processData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('groups dedicated storage sizes by network, node type and client', async () => {
    axios.get.mockResolvedValue({
      data: {
        blockchains: {
          full: catalogEntry(),
          largerEstimate: catalogEntry({ total_storage_gb: 920 }),
          smallerEstimate: catalogEntry({ total_storage_gb: 810 }),
          archive: catalogEntry({
            client: { name: 'erigon', title: 'Erigon' },
            mode: 'archive',
            total_storage_gb: 7600,
          }),
          anotherClient: catalogEntry({
            client: { name: 'reth', title: 'Reth' },
            total_storage_gb: 600,
          }),
          unavailable: catalogEntry({
            client: { name: 'geth', title: 'Geth' },
            clouds: {},
          }),
          missingSize: catalogEntry({
            client: { name: 'unknown', title: 'Unknown' },
            total_storage_gb: null,
          }),
          unsupportedMode: catalogEntry({ mode: 'other' }),
        },
      },
    });

    await expect(processData()).resolves.toEqual([
      {
        protocol: 'polygon-pos',
        network: 'polygon-pos-mainnet',
        full: [
          { node_data: { client: 'bor', size_required: 920 } },
          { node_data: { client: 'reth', size_required: 600 } },
        ],
        archive: [{ node_data: { client: 'erigon', size_required: 7600 } }],
      },
    ]);
  });

  it.each([
    ['ADI Chain', 'adichain'],
    ['X Layer', 'xlayer'],
    ['XDC Network', 'xdc'],
    ['ZKsync Era', 'zksync'],
  ])('maps %s to the stable protocol slug %s', async (name, slug) => {
    axios.get.mockResolvedValue({
      data: {
        blockchains: {
          entry: catalogEntry({
            protocol: { name, title: name },
            network: { name: `${slug}-mainnet`, title: 'Mainnet' },
          }),
        },
      },
    });

    await expect(processData()).resolves.toMatchObject([{ protocol: slug }]);
  });

  it('keeps the catalog network identifier for rebranded protocols', async () => {
    axios.get.mockResolvedValue({
      data: {
        blockchains: {
          kaia: catalogEntry({
            protocol: { name: 'Kaia', title: 'Kaia' },
            network: { name: 'klaytn-mainnet', title: 'Mainnet' },
            client: { name: 'ken', title: 'Ken' },
          }),
        },
      },
    });

    await expect(processData()).resolves.toMatchObject([
      { protocol: 'klaytn', network: 'klaytn-mainnet' },
    ]);
  });

  it('rejects a catalog with no usable storage sizes', async () => {
    axios.get.mockResolvedValue({
      data: { blockchains: { missingSize: catalogEntry({ total_storage_gb: 0 }) } },
    });

    await expect(processData()).rejects.toThrow('No dedicated node sizes');
  });
});
