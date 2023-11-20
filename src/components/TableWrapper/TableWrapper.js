import React from 'react';
import { Table } from 'antd';
import {
  capitalizeFirstLetter,
  //   keyGenerator,
  //   gbToTb,
} from '../../helpers/utils';
import ProtocolIcon from '../ProtocolIcon/ProtocolIcon';

const TableWrapper = ({ data }) => {
  const formatProtocolName = (protocolName) => {
    const protocols = {
      bsc: 'BNB Chain',
      // cordapublic: 'corda public',
      'polygon-pos': 'polygon POS',
      'polygon-zkevm': 'polygon zkEVM',
    };

    return protocols[protocolName] || protocolName;
  };

  const formatNetworkName = (newtworkName) => {
    const networks = {
      binancesmartchain: 'bsc-',
      // cordapublic: 'corda-public-',
      polygonpos: 'polygon-pos-',
      polygonzkevm: 'polygon-zkevm-',
      default: `${newtworkName}-`,
    };
    return networks[newtworkName] || networks.default;
  };

  const formatClientName = (clientName) => {
    const clients = {
      bitcoind: 'Bitcoin Core',
      'zkevm-node': 'zkEVM Node',
      avalanchego: 'AvalancheGo',
      'tezos-node': 'Octez',
      default: clientName.charAt(0).toUpperCase() + clientName.slice(1),
    };
    return clients[clientName] || clients.default;
  };

  const protocolsList = Array.from(
    new Set(
      data
        .filter((item) => !item.protocol.includes('corda'))
        .filter((item) => !item.protocol.includes('fabric'))
        .filter((item) => !item.protocol.includes('multichain'))
        .filter((item) => !item.protocol.includes('quorum'))
    )
  )
    .map((item) => {
      let splitted = [];

      ['full', 'archive'].forEach((type) => {
        if (item.hasOwnProperty(type)) {
          splitted.push({
            protocol:
              item.protocol !== 'zksync'
                ? capitalizeFirstLetter(formatProtocolName(item.protocol))
                : 'zkSync',

            network: capitalizeFirstLetter(
              item.network
                .replace(formatNetworkName(item.protocol), '')
                .replace('-', ' ')
                .replace('–', ' ')
                .replace('—', ' ') +
                ' ' +
                type
            ),

            client: formatClientName(item[type][0].node_data.client),
            size_required: item[type][0].node_data.size_required,
          });
        }
      });
      return splitted;
    })
    .flat();

  const tableData = protocolsList.map((item, index) => {
    return {
      ...item,
      key: index + 1,
    };
  });

  const protocolIndexesForCellMerge = () => {
    const protocolNamesList = Array.from(
      new Set(protocolsList.map((item) => item.protocol))
    );

    const indexes = [];

    protocolNamesList.forEach((item) => {
      const tempIndexes = [];
      for (let i = 0; i < protocolsList.length; i++) {
        if (protocolsList[i].protocol === item) {
          tempIndexes.push(i);
        }
      }
      indexes.push({
        protocol: item,
        indexes: tempIndexes,
      });
    });

    return indexes;
  };

  const columns = [
    {
      title: 'Protocol',
      dataIndex: 'protocol',
      filters: [
        ...Array.from(new Set(protocolsList.map((item) => item.protocol))),
      ].map((item) => {
        return {
          text: item,
          value: item,
        };
      }),
      onFilter: (value, record) => record.protocol.indexOf(value) === 0,
      sorter: (a, b) => a.protocol.localeCompare(b.protocol),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
      onCell: (_, index) => {
        let arr = [...protocolIndexesForCellMerge()];
        for (let i = 0; i < arr.length; i++) {
          //
          if (index === arr[i].indexes[0]) {
            return { rowSpan: arr[i].indexes.length };
          }

          if (index > arr[i].indexes[0] && index <= arr[i].indexes.slice(-1)) {
            return { rowSpan: 0 };
          }
          //
        }

        return {};
      },
      //   rowScope: 'row',
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
      filters: [
        ...Array.from(new Set(protocolsList.map((item) => item.network))),
      ].map((item) => {
        return {
          text: item,
          value: item,
        };
      }),
      onFilter: (value, record) => record.network.indexOf(value) === 0,
      sorter: (a, b) => a.network.localeCompare(b.network),
      //   sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Client',
      dataIndex: 'client',
      filters: [
        ...Array.from(new Set(protocolsList.map((item) => item.client))),
      ].map((item) => {
        return {
          text: item,
          value: item,
        };
      }),
      onFilter: (value, record) => record.client.indexOf(value) === 0,
      sorter: (a, b) => a.client.localeCompare(b.client),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Data stored, GB',
      dataIndex: 'size_required',
      align: 'right',
      sorter: (a, b) => a.size_required - b.size_required,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ x: 500 }}
    />
  );
};

export default TableWrapper;
