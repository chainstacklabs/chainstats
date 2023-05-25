import React from 'react';
import { Tag, Spin } from 'antd';
import {
  capitalizeFirstLetter,
  keyGenerator,
  gbToTb,
} from '../../helpers/utils';
import { DatabaseOutlined } from '@ant-design/icons';

import './ProtocolCards.scss';

export default function ProtocolCards({ data }) {
  const protocolsArray = Array.from(
    new Set(
      data
        .filter((item) => !item.protocol.includes('corda'))
        .filter((item) => !item.protocol.includes('fabric'))
        .filter((item) => !item.protocol.includes('multichain'))
        .map((item) => item.protocol)
    )
  );
  console.log('protocolsArray', protocolsArray);

  const formatProtocolName = (protocolName) => {
    const protocols = {
      binancesmartchain: 'Binance Smart Chain',
      cordapublic: 'corda public',
      polygonpos: 'polygon POS',
      polygonzkevm: 'polygon zkEVM',
    };

    return protocols[protocolName] || protocolName;
  };

  const formatNetworkName = (newtworkName) => {
    const networks = {
      binancesmartchain: 'bsc-',
      cordapublic: 'corda-public-',
      polygonpos: 'polygon-pos-',
      polygonzkevm: 'polygon-zkevm-',
      default: `${newtworkName}-`,
    };
    return networks[newtworkName] || networks.default;
  };

  const Card = (cardHeader, size, client) => {
    return (
      <div className="card" key={keyGenerator()}>
        <div className="card_header">
          <div>{cardHeader}</div>
        </div>
        <div className="card_data__block">
          <div className="metadata_wrapper">
            <div className="metadata">
              <span>Size:</span>
              <div className="size_value">
                <Tag
                  icon={<DatabaseOutlined />}
                  bordered={false}
                  className="custom_tag"
                >
                  {size ? size : 'No Data'}
                </Tag>
              </div>
            </div>
            <div className="metadata">
              <span>Client:</span>
              <div>
                <Tag color="default" bordered={false}>
                  {client}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {protocolsArray.map((protocolName, idx) => (
        <div key={idx} className="row">
          <div className="network_name">
            {capitalizeFirstLetter(formatProtocolName(protocolName))}
          </div>
          <div className="nodes_list">
            {data.map((obj, index) => {
              if (protocolName === obj.protocol) {
                let arr = [];

                ['full', 'archive'].forEach((type) => {
                  if (obj.hasOwnProperty(type)) {
                    obj[type].forEach((item) =>
                      arr.push(
                        Card(
                          capitalizeFirstLetter(
                            obj.network.replace(
                              formatNetworkName(protocolName),
                              ''
                            ) +
                              ' ' +
                              type
                          )
                            .replace('-', ' ')
                            .replace('–', ' ')
                            .replace('—', ' '),
                          item['node_data']['size_required']
                            ? gbToTb(item['node_data']['size_required'])
                            : 'No data',
                          item['node_data']['client']
                        )
                      )
                    );
                  }
                });
                return <>{arr}</>;
              }
            })}
          </div>
        </div>
      ))}
    </>
  );
}
