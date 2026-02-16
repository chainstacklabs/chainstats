import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import processData from './getData';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('processData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('keeps only dedicated public nodes that have storage size data', async () => {
    axios.get.mockResolvedValue({
      data: {
        Enterprise: {
          protocols: {
            foo: {
              'foo-mainnet': {
                dedicated: {
                  full: {
                    'foo-public': {
                      type: 'public',
                      node_info: {
                        storage: {
                          size_required: 100,
                        },
                      },
                    },
                    'foo-private': {
                      type: 'consortium',
                      node_info: {
                        storage: {
                          size_required: 200,
                        },
                      },
                    },
                    'foo-no-size': {
                      type: 'public',
                      node_info: {
                        storage: {},
                      },
                    },
                    'foo-null-size': {
                      type: 'public',
                      node_info: {
                        storage: {
                          size_required: null,
                        },
                      },
                    },
                  },
                  archive: {
                    'foo-archive': {
                      type: 'public',
                      node_info: {
                        storage: {
                          size_required: 300,
                        },
                      },
                    },
                  },
                },
              },
            },
            bar: {
              'bar-mainnet': {
                shared: {
                  full: {
                    'bar-public': {
                      type: 'public',
                      node_info: {
                        storage: {
                          size_required: 500,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    await expect(processData()).resolves.toEqual([
      {
        protocol: 'foo',
        network: 'foo-mainnet',
        full: [
          {
            node_data: {
              client: 'foo-public',
              size_required: 100,
            },
          },
        ],
        archive: [
          {
            node_data: {
              client: 'foo-archive',
              size_required: 300,
            },
          },
        ],
      },
    ]);
  });
});
