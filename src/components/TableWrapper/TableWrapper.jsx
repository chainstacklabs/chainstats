import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import ProtocolIcon from '../ProtocolIcon/ProtocolIcon';
import {
  formatNetworkLabel,
  formatProtocolDisplayName,
  formatNetworkDisplayName,
} from '../../helpers/protocolDisplay';
import { formatClientName } from '../../helpers/clientDisplay';

const NODE_TYPE_RANKS = {
  full: 0,
  archive: 1,
};

const getNetworkFamilyRank = (networkSlug) => {
  if (networkSlug.includes('mainnet')) {
    return 0;
  }

  if (networkSlug.includes('testnet')) {
    return 1;
  }

  return 2;
};

const getNodeTypeRank = (nodeType) => NODE_TYPE_RANKS[nodeType] ?? 2;

const toFilterItems = (items, key) =>
  Array.from(new Set(items.map((item) => item[key])))
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({
      text: value,
      value,
    }));

const TableWrapper = ({ data }) => {
  const protocolsList = useMemo(
    () =>
      data
        .flatMap((item) =>
          ['full', 'archive'].flatMap((type) => {
            if (!Array.isArray(item[type])) {
              return [];
            }

            return item[type].map((clientItem) => {
              const networkLabel = formatNetworkLabel(item.network, item.protocol);

              return {
                protocol: formatProtocolDisplayName(item.protocol),
                network: formatNetworkDisplayName(item.network, item.protocol, type),
                networkLabel,
                networkFamilyRank: getNetworkFamilyRank(item.network),
                nodeType: type,
                nodeTypeRank: getNodeTypeRank(type),
                client: formatClientName(clientItem.node_data.client),
                size_required: clientItem.node_data.size_required,
              };
            });
          })
        )
        .sort((a, b) => {
          if (a.protocol !== b.protocol) {
            return a.protocol.localeCompare(b.protocol);
          }

          if (a.networkFamilyRank !== b.networkFamilyRank) {
            return a.networkFamilyRank - b.networkFamilyRank;
          }

          if (a.nodeTypeRank !== b.nodeTypeRank) {
            return a.nodeTypeRank - b.nodeTypeRank;
          }

          if (a.networkLabel !== b.networkLabel) {
            return a.networkLabel.localeCompare(b.networkLabel);
          }

          return a.client.localeCompare(b.client);
        }),
    [data]
  );

  const tableData = useMemo(
    () =>
      protocolsList.map((item, index) => ({
        ...item,
        key: index + 1,
      })),
    [protocolsList]
  );

  const [visibleData, setVisibleData] = useState(tableData);

  useEffect(() => {
    setVisibleData(tableData);
  }, [tableData]);

  const protocolRowSpans = useMemo(() => {
    const spans = new Map();

    for (let index = 0; index < visibleData.length; ) {
      const currentProtocol = visibleData[index].protocol;
      let runLength = 1;

      while (
        index + runLength < visibleData.length &&
        visibleData[index + runLength].protocol === currentProtocol
      ) {
        runLength += 1;
      }

      spans.set(index, runLength);

      for (let offset = 1; offset < runLength; offset += 1) {
        spans.set(index + offset, 0);
      }

      index += runLength;
    }

    return spans;
  }, [visibleData]);

  const columns = useMemo(
    () => [
      {
        title: 'Protocol',
        dataIndex: 'protocol',
        filters: toFilterItems(protocolsList, 'protocol'),
        onFilter: (value, record) => record.protocol === value,
        sorter: (a, b) => a.protocol.localeCompare(b.protocol),
        sortDirections: ['descend', 'ascend'],
        defaultSortOrder: 'ascend',
        onCell: (_, index) => {
          if (typeof index !== 'number') {
            return {};
          }

          const rowSpan = protocolRowSpans.get(index);
          if (rowSpan === 0) {
            return { rowSpan: 0 };
          }

          if (typeof rowSpan === 'number' && rowSpan > 1) {
            return { rowSpan };
          }

          return { rowSpan: 1 };
        },
        render: (text) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProtocolIcon protocolName={text} />

              <div
                style={{
                  marginLeft: '8px',
                  fontWeight: '500',
                }}
              >
                {text}
              </div>
            </div>
          );
        },
      },
      {
        title: 'Network',
        dataIndex: 'network',
        sortDirections: ['descend', 'ascend'],
        filters: toFilterItems(protocolsList, 'network'),
        onFilter: (value, record) => record.network === value,
        sorter: (a, b) => a.network.localeCompare(b.network),
      },
      {
        title: 'Client',
        dataIndex: 'client',
        filters: toFilterItems(protocolsList, 'client'),
        onFilter: (value, record) => record.client === value,
        sorter: (a, b) => a.client.localeCompare(b.client),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Data stored, GB',
        dataIndex: 'size_required',
        align: 'right',
        sorter: (a, b) => (a.size_required || 0) - (b.size_required || 0),
        render: (value) =>
          value !== undefined && value !== null
            ? Number(value).toLocaleString()
            : 'No data',
      },
    ],
    [protocolRowSpans, protocolsList]
  );

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={(_, __, ___, extra) => {
        if (Array.isArray(extra?.currentDataSource)) {
          setVisibleData(extra.currentDataSource);
        }
      }}
      pagination={false}
      scroll={{ x: 500 }}
    />
  );
};

export default TableWrapper;
