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
  const protocolsArray = Array.from(new Set(data.map((item) => item.protocol)));

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

  const Card = (protocolName, obj, type) => {
    return (
      <div className="card" key={keyGenerator()}>
        <div className="card_header">
          <div>
            {capitalizeFirstLetter(
              obj.network.replace(formatNetworkName(protocolName), '') +
                ' ' +
                type
            )}
          </div>
        </div>
        <div className="card_data__block">
          <div className="metadata_wrapper">
            <div className="metadata">
              <span>Size:</span>
              <div className="size_value">
                <Tag
                  style={{
                    backgroundColor: 'var(--color-typo-brand)',
                    color: '#fff',
                  }}
                  icon={<DatabaseOutlined />}
                  bordered={false}
                >
                  {obj[`${type}`]['node_data']['size_required']
                    ? gbToTb(obj[`${type}`]['node_data']['size_required'])
                    : 'No data'}
                </Tag>
              </div>
            </div>
            <div className="metadata">
              <span>Client:</span>
              <div>
                <Tag color="default" bordered={false}>
                  {obj[`${type}`]['node_data'].client}
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
                    arr.push(Card(protocolName, obj, type));
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
