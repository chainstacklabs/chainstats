import React, { useMemo, useState } from 'react';
import { Table } from 'antd';
import ProtocolIcon from '../ProtocolIcon/ProtocolIcon';
import {
  formatNetworkLabel,
  formatProtocolDisplayName,
  formatNetworkDisplayName,
} from '../../helpers/protocolDisplay';
import { formatClientName } from '../../helpers/clientDisplay';
import './TableWrapper.scss';

const NODE_TYPE_RANKS = {
  full: 0,
  archive: 1,
};

const DEFAULT_SORTER = {
  field: 'protocol',
  order: 'ascend',
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

const SORTERS = {
  protocol: (a, b) => a.protocol.localeCompare(b.protocol),
  network: (a, b) => a.network.localeCompare(b.network),
  client: (a, b) => a.client.localeCompare(b.client),
  size_required: (a, b) => (a.size_required || 0) - (b.size_required || 0),
};

const TableWrapper = ({ data }) => {
  const [tableFilters, setTableFilters] = useState({});
  const [tableSorter, setTableSorter] = useState(DEFAULT_SORTER);
  const activeSorter =
    Array.isArray(tableSorter) && tableSorter.length
      ? tableSorter[0]
      : tableSorter;

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

  const visibleData = useMemo(() => {
    const protocolFilters = tableFilters.protocol || [];
    const networkFilters = tableFilters.network || [];
    const clientFilters = tableFilters.client || [];

    let nextRows = tableData.filter((row) => {
      if (protocolFilters.length && !protocolFilters.includes(row.protocol)) {
        return false;
      }

      if (networkFilters.length && !networkFilters.includes(row.network)) {
        return false;
      }

      if (clientFilters.length && !clientFilters.includes(row.client)) {
        return false;
      }

      return true;
    });

    const sorterField = activeSorter?.field;
    const sorterOrder = activeSorter?.order;
    const compare = SORTERS[sorterField];

    if (compare && sorterOrder) {
      nextRows = [...nextRows].sort((a, b) =>
        sorterOrder === 'ascend' ? compare(a, b) : -compare(a, b)
      );
    }

    return nextRows;
  }, [activeSorter, tableData, tableFilters]);

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
        filteredValue: tableFilters.protocol || null,
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        sortOrder: activeSorter?.field === 'protocol' ? activeSorter.order : null,
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
            <div className="protocol-cell">
              <ProtocolIcon protocolName={text} />
              <div className="protocol-cell__label">{text}</div>
            </div>
          );
        },
      },
      {
        title: 'Network',
        dataIndex: 'network',
        sortDirections: ['descend', 'ascend'],
        filters: toFilterItems(protocolsList, 'network'),
        filteredValue: tableFilters.network || null,
        sorter: true,
        sortOrder: activeSorter?.field === 'network' ? activeSorter.order : null,
      },
      {
        title: 'Client',
        dataIndex: 'client',
        filters: toFilterItems(protocolsList, 'client'),
        filteredValue: tableFilters.client || null,
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        sortOrder: activeSorter?.field === 'client' ? activeSorter.order : null,
      },
      {
        title: 'Data stored, GB',
        dataIndex: 'size_required',
        align: 'right',
        sorter: true,
        sortOrder:
          activeSorter?.field === 'size_required' ? activeSorter.order : null,
        render: (value) =>
          value !== undefined && value !== null
            ? Number(value).toLocaleString()
            : 'No data',
      },
    ],
    [activeSorter, protocolRowSpans, protocolsList, tableFilters]
  );

  return (
    <Table
      columns={columns}
      dataSource={visibleData}
      onChange={(_, filters, sorter) => {
        setTableFilters(filters || {});
        setTableSorter(sorter || DEFAULT_SORTER);
      }}
      pagination={false}
      scroll={{ x: 500 }}
    />
  );
};

export default TableWrapper;
