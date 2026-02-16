import React from 'react';
import { Tag } from 'antd';
import { gbToTb } from '../../helpers/utils';
import { DatabaseOutlined } from '@ant-design/icons';
import {
  formatProtocolDisplayName,
  formatNetworkDisplayName,
} from '../../helpers/protocolDisplay';
import { formatClientName } from '../../helpers/clientDisplay';

import './ProtocolCards.scss';

const Card = ({ cardHeader, size, client }) => {
  return (
    <div className="card">
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

export default function ProtocolCards({ data }) {
  const protocolsArray = Array.from(new Set(data.map((item) => item.protocol)));

  return (
    <>
      {protocolsArray.map((protocolName) => (
        <div key={protocolName} className="row">
          <h2 className="network_name">
            {formatProtocolDisplayName(protocolName)}
          </h2>
          <div className="nodes_list">
            {data
              .filter((obj) => protocolName === obj.protocol)
              .flatMap((obj) =>
                ['full', 'archive'].flatMap((type) => {
                  if (!Array.isArray(obj[type])) {
                    return [];
                  }

                  return obj[type].map((item) => {
                    const storage = item.node_data.size_required;
                    const client = item.node_data.client;
                    const cardHeader = formatNetworkDisplayName(
                      obj.network,
                      protocolName,
                      type
                    );

                    return (
                      <Card
                        key={`${protocolName}-${obj.network}-${type}-${client}`}
                        cardHeader={cardHeader}
                        size={storage ? gbToTb(storage) : 'No data'}
                        client={formatClientName(client)}
                      />
                    );
                  });
                })
              )}
          </div>
        </div>
      ))}
    </>
  );
}
