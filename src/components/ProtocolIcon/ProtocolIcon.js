import React from 'react';

import { ReactComponent as Aptos } from './aptos.svg';
import { ReactComponent as Arbitrum } from './arbitrum.svg';
import { ReactComponent as Aurora } from './aurora.svg';
import { ReactComponent as Avalanche } from './avalanche.svg';
import { ReactComponent as Base } from './base.svg';
import { ReactComponent as Bitcoin } from './bitcoin.svg';
import { ReactComponent as Bnb } from './bnb.svg';
import { ReactComponent as Cronos } from './cronos.svg';
import { ReactComponent as Ethereum } from './ethereum.svg';
import { ReactComponent as Fantom } from './fantom.svg';
import { ReactComponent as Filecoin } from './filecoin.svg';
import { ReactComponent as Fuse } from './fuse.svg';
import { ReactComponent as Gnosis } from './gnosis.svg';
import { ReactComponent as Harmony } from './harmony.svg';
import { ReactComponent as Near } from './near.svg';
import { ReactComponent as Optimism } from './optimism.svg';
import { ReactComponent as PolygonPOS } from './polygonPOS.svg';
import { ReactComponent as PolygonZkEvm } from './polygonZkEvm.svg';
import { ReactComponent as Scroll } from './scroll.svg';
import { ReactComponent as Solana } from './solana.svg';
import { ReactComponent as Starknet } from './starknet.svg';
import { ReactComponent as Tezos } from './tezos.svg';
import { ReactComponent as ZkSync } from './zkSync.svg';

const iconTypes = {
  Aptos: <Aptos />,
  Arbitrum: <Arbitrum />,
  Aurora: <Aurora />,
  Avalanche: <Avalanche />,
  Base: <Base />,
  Bitcoin: <Bitcoin />,
  'BNB Chain': <Bnb />,
  Cronos: <Cronos />,
  Ethereum: <Ethereum />,
  Fantom: <Fantom />,
  Filecoin: <Filecoin />,
  Fuse: <Fuse />,
  Gnosis: <Gnosis />,
  Harmony: <Harmony />,
  Near: <Near />,
  Optimism: <Optimism />,
  'Polygon POS': <PolygonPOS />,
  'Polygon zkEVM': <PolygonZkEvm />,
  Scroll: <Scroll />,
  Solana: <Solana />,
  Starknet: <Starknet />,
  Tezos: <Tezos />,
  zkSync: <ZkSync />,
};

const ProtocolIcon = ({ protocolName }) => {
  return iconTypes[protocolName];
};

export default ProtocolIcon;
